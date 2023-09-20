import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClinicalService {
  private http = inject(HttpClient);

  getClinicalTrials() {
    return this.http.get(
      'https://clinicaltrials.gov/api/query/full_studies?expr=covid-19&min_rnk=1&max_rnk=100&fmt=json'
    );
  }
}
