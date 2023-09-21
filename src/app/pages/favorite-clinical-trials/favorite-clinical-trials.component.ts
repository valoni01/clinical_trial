import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicalStore } from 'src/app/clinical.store';
import { ClinicalTrialListItemComponent } from 'src/app/ui-components/clinical-trial-list-item/clinical-trial-list-item.component';

@Component({
  selector: 'app-favorite-clinical-trials',
  standalone: true,
  imports: [CommonModule, ClinicalTrialListItemComponent],
  templateUrl: './favorite-clinical-trials.component.html',
  styleUrls: ['./favorite-clinical-trials.component.scss'],
})
export class FavoriteClinicalTrialsComponent {
  private store = inject(ClinicalStore);

  public readonly favoriteClinicalTrials$ =
    this.store.getFavoriteClinicalTrial$;

  public readonly clinicalTrials$ = this.store.getClinicalTrials$;

  public updateFavorite(favoriteTrial: any): void {
    this.store.updateFavoriteClinicalTrial(favoriteTrial);
  }
}
