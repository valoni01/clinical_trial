import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicalTrialListItemComponent } from 'src/app/ui-components/clinical-trial-list-item/clinical-trial-list-item.component';
import { ClinicalStore } from 'src/app/clinical.store';
import { ClinicalTrialModel } from 'src/app/clinical-trial.model';

@Component({
  selector: 'app-clinical-trials',
  standalone: true,
  imports: [CommonModule, ClinicalTrialListItemComponent],
  templateUrl: './clinical-trials.component.html',
  styleUrls: ['./clinical-trials.component.scss'],
})
export class ClinicalTrialsComponent implements OnInit {
  private store = inject(ClinicalStore);

  public readonly clinicalTrials$ = this.store.getClinicalTrials$;

  public ngOnInit(): void {
    this.store.fetchClinicalTrials();
  }

  public updateFavorite(favoriteTrial: ClinicalTrialModel): void {
    this.store.updateFavoriteClinicalTrial(favoriteTrial);
  }
}
