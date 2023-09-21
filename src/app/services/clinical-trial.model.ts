export interface ClinicalTrialModel {
  nctId: string;
  briefTitle: string;
  officialTitle: string;
  acronym: string;
  isFavorite?: boolean;
}

export interface AppClinicalTrialState {
  clinicalTrials: ClinicalTrialModel[];
  favoriteClinicalTrial: ClinicalTrialModel[];
}
