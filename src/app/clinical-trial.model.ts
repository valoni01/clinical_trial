export interface ClinicalTrialModel {
  nctId: string;
  briefTitle: string;
  officialTitle: string;
  acronym: string;
}

export interface AppClinicalTrialState {
  clinicalTrials: ClinicalTrialModel[];
  favoriteClinicalTrial: ClinicalTrialModel[];
}
