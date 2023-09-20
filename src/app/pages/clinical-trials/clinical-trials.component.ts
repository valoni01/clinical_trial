import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicalTrialListItemComponent } from 'src/app/ui-components/clinical-trial-list-item/clinical-trial-list-item.component';

@Component({
  selector: 'app-clinical-trials',
  standalone: true,
  imports: [CommonModule, ClinicalTrialListItemComponent],
  templateUrl: './clinical-trials.component.html',
  styleUrls: ['./clinical-trials.component.scss'],
})
export class ClinicalTrialsComponent {}
