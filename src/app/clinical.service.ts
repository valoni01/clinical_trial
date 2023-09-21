import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, flatMap, map } from 'rxjs';
import { ClinicalTrialModel } from 'src/app/clinical-trial.model';

@Injectable({
  providedIn: 'root',
})
export class ClinicalService {
  private http = inject(HttpClient);

  public getClinicalTrials(): Observable<ClinicalTrialModel[]> {
    return this.http
      .get('https://clinicaltrials.gov/api/v2/studies')
      .pipe(
        map((res: any) =>
          res.studies.map(
            (res: any) =>
              <ClinicalTrialModel>res.protocolSection.identificationModule
          )
        )
      );
  }
}
