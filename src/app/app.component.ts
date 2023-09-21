import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToolBarComponent } from 'src/app/ui-components/tool-bar/tool-bar.component';
import { ClinicalStore } from 'src/app/services/clinical.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToolBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private clinicalTrialStore = inject(ClinicalStore);

  public ngOnInit(): void {
    this.clinicalTrialStore.fetchClinicalTrialLogic(false);
  }
}
