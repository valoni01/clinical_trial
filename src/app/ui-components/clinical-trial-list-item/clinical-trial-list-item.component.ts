import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ClinicalTrialModel } from 'src/app/clinical-trial.model';

@Component({
  selector: 'app-clinical-trial-list-item',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './clinical-trial-list-item.component.html',
  styleUrls: ['./clinical-trial-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicalTrialListItemComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;

  @Input() public trialName = 'some title';
  @Input() public trialDescription = 'random';
  @Input() public trialDetails = 'more description';
  @Input() public listState: 'favorite' | 'default' = 'default';

  @Output() public onFavoriteUpdate: EventEmitter<null> = new EventEmitter();

  public updateFavorite(): void {
    this.onFavoriteUpdate.emit();
  }
}
