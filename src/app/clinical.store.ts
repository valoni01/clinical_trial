import { ClinicalService } from './clinical.service';
import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  EMPTY,
  catchError,
  pipe,
  switchMap,
  tap,
  Observable,
  take,
} from 'rxjs';
import {
  AppClinicalTrialState,
  ClinicalTrialModel,
} from 'src/app/clinical-trial.model';

export const defaultState: AppClinicalTrialState = {
  clinicalTrials: [],
  favoriteClinicalTrial: [], //this is to ensure that even when new data is fetched, the favorite clinical trials are still available.
};
@Injectable({ providedIn: 'root' })
export class ClinicalStore extends ComponentStore<AppClinicalTrialState> {
  private clinicalService = inject(ClinicalService);

  constructor() {
    super(defaultState);
  }

  public getClinicalTrials$: Observable<ClinicalTrialModel[]> = this.select(
    state => state.clinicalTrials
  );

  public getFavoriteClinicalTrial$: Observable<ClinicalTrialModel[]> =
    this.select(state => state.favoriteClinicalTrial);

  public updateFavoriteClinicalTrial(trial: ClinicalTrialModel) {
    this.getFavoriteClinicalTrial$
      .pipe(
        take(1),
        tap(trials => {
          const isClinicalTrialFavorite = trials.some(({ nctId }) => {
            trial.nctId === nctId;
          });
          if (isClinicalTrialFavorite) {
            this.removeFavoriteClinicalTrial(trials, trial);
          } else this.setFavoriteClinicalTrial(trial);
        })
      )
      .subscribe();
  }

  private readonly setFavoriteClinicalTrial = this.updater(
    (
      state,
      favoriteClinicalTrial: ClinicalTrialModel
    ): AppClinicalTrialState => {
      return {
        ...state,
        favoriteClinicalTrial: [
          ...state.favoriteClinicalTrial,
          favoriteClinicalTrial,
        ],
      };
    }
  );

  public updateClinicalTrial(clinicalTrials: ClinicalTrialModel[]) {
    this.patchState({ clinicalTrials });
  }

  private removeFavoriteClinicalTrial(
    favoriteClinicalTrial: ClinicalTrialModel[],
    trialToRemove: ClinicalTrialModel
  ): void {
    favoriteClinicalTrial = favoriteClinicalTrial.filter(
      ({ nctId }) => nctId !== trialToRemove.nctId
    );

    this.patchState({ favoriteClinicalTrial });
  }

  public readonly fetchClinicalTrials = this.effect<void>(
    pipe(
      switchMap(() =>
        this.clinicalService.getClinicalTrials().pipe(
          tapResponse(
            response => {
              this.updateClinicalTrial(response);
            },
            (e: string) => console.log(e)
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
