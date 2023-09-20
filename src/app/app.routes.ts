import { Routes } from '@angular/router';
import { ClinicalTrialsComponent } from 'src/app/pages/clinical-trials/clinical-trials.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clinical-trials', pathMatch: 'full' },

  {
    path: 'clinical-trials',
    component: ClinicalTrialsComponent,
  },
  {
    path: 'clinical-trials-favorites',
    loadComponent: () =>
      import(
        './pages/favorite-clinical-trials/favorite-clinical-trials.component'
      ).then(m => m.FavoriteClinicalTrialsComponent),
  },
];
