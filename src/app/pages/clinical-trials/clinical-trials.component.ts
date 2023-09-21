import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicalTrialListItemComponent } from 'src/app/ui-components/clinical-trial-list-item/clinical-trial-list-item.component';
import { ClinicalStore } from 'src/app/services/clinical.store';
import { ClinicalTrialModel } from 'src/app/services/clinical-trial.model';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clinical-trials',
  standalone: true,
  imports: [
    CommonModule,
    ClinicalTrialListItemComponent,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './clinical-trials.component.html',
})
export class ClinicalTrialsComponent {
  private store = inject(ClinicalStore);

  public isActive = false;

  public readonly clinicalTrials$ = this.store.getClinicalTrials$;

  public updateFavorite(favoriteTrial: ClinicalTrialModel): void {
    this.store.updateFavoriteClinicalTrial(favoriteTrial);
  }

  public trialByID(index: number, trial: ClinicalTrialModel): string {
    return trial?.nctId;
  }

  public setAutoFetchData(event: MatSlideToggleChange): void {
    this.store.fetchClinicalTrialLogic(event.checked);
  }
}
