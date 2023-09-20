import { ClinicalService } from './clinical.service';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClinicalStoreService {
  private clinicalService = inject(ClinicalService);

  private clinicalTrials$ = new BehaviorSubject([]);
  public clinicalTrials = this.clinicalTrials$.asObservable();

  private favoriteClinicalTrial$ = new BehaviorSubject(0);
  public clinicalTrialsCount$ = this.favoriteClinicalTrial$.asObservable();

  public getClinicalTrials$ = () => this.clinicalService.getClinicalTrials();
}
