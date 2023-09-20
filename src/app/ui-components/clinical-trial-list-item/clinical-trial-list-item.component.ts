import { Component, Input, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clinical-trial-list-item',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './clinical-trial-list-item.component.html',
  styleUrls: ['./clinical-trial-list-item.component.scss'],
})
export class ClinicalTrialListItemComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;

  @Input() public trialName: string = 'some title';
  @Input() public trialDescription: string = 'random';
  @Input() public trialDetails: string = 'more description';
  @Input() public listState: 'favorite' | 'default' = 'default';
}
