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
  interval,
} from 'rxjs';
import { ClinicalTrialHelper } from 'src/app/services/clinical-trial.helper';
import {
  AppClinicalTrialState,
  ClinicalTrialModel,
} from 'src/app/services/clinical-trial.model';

export const defaultState: AppClinicalTrialState = {
  clinicalTrials: [],
  favoriteClinicalTrial: [], //this is to ensure that even when new data is fetched, the favorite clinical trials are still available.
};
@Injectable({ providedIn: 'root' })
export class ClinicalStore extends ComponentStore<AppClinicalTrialState> {
  private clinicalService = inject(ClinicalService);
  private clinicalTrialHelper = inject(ClinicalTrialHelper);

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
          const favoriteTrials =
            this.clinicalTrialHelper.upsertClinicalTrialFavoriteProperty(
              trials,
              trial
            );
          if (favoriteTrials.length === 10) {
            throw new Error('You can only have 10 favorite trials');
          }
          this.updateClinicalTrialFavoriteFlag(trial);
          this.updateFavoriteClinicalTrials(favoriteTrials);
        })
      )
      .subscribe();
  }

  public updateClinicalTrialFavoriteFlag(trial: ClinicalTrialModel) {
    this.getClinicalTrials$
      .pipe(
        take(1),
        tap(trials => {
          const clinicalTrials = this.clinicalTrialHelper.updateClinicalTrials(
            trials,
            trial
          );
          this.updateClinicalTrials(clinicalTrials);
        })
      )
      .subscribe();
  }

  public updateClinicalTrials(clinicalTrials: ClinicalTrialModel[]) {
    this.patchState({ clinicalTrials });
  }

  public updateFavoriteClinicalTrials(
    favoriteClinicalTrial: ClinicalTrialModel[]
  ) {
    this.patchState({ favoriteClinicalTrial });
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

  private readonly fetchClinicalTrials = this.effect<void>(
    pipe(
      switchMap(() =>
        this.clinicalService.getClinicalTrials().pipe(
          tapResponse(
            response => {
              this.updateClinicalTrials(response);
            },
            (e: string) => console.log(e)
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public fetchClinicalTrialLogic(isAutomaticFetch = false) {
    this.fetchClinicalTrials();

    //(TODO) Autofetch logic is not working as expected. Need to fix it.

    // let autoFetch = interval(5000).pipe(takeUntil(of(!isAutomaticFetch))).subscribe(_ => {
    //   this.fetchClinicalTrials();
    // });
  }
}
