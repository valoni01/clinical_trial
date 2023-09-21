import { Injectable } from '@angular/core';
import { ClinicalTrialModel } from 'src/app/services/clinical-trial.model';

@Injectable({ providedIn: 'root' })
export class ClinicalTrialHelper {
  public upsertClinicalTrialFavoriteProperty(
    trials: ClinicalTrialModel[],
    updatedTrial: ClinicalTrialModel
  ): ClinicalTrialModel[] {
    let clinicalTrial: ClinicalTrialModel[] = trials;

    const trialIndex = clinicalTrial.findIndex(
      ({ nctId }) => nctId === updatedTrial.nctId
    );

    if (trialIndex > -1) {
      updatedTrial.isFavorite = false;
      clinicalTrial = clinicalTrial.splice(trialIndex, 1);
    } else {
      updatedTrial.isFavorite = true;
      clinicalTrial.push(updatedTrial);
    }

    return clinicalTrial;
  }

  public updateClinicalTrials(
    trials: ClinicalTrialModel[],
    updatedTrial: ClinicalTrialModel
  ): ClinicalTrialModel[] {
    const clinicalTrial: ClinicalTrialModel[] = trials;

    const trialIndex = clinicalTrial.findIndex(
      ({ nctId }) => nctId === updatedTrial.nctId
    );
    if (trialIndex > -1) {
      clinicalTrial[trialIndex] = updatedTrial;
    }

    return clinicalTrial;
  }
}
