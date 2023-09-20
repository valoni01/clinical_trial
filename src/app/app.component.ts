import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { ToolBarComponent } from 'src/app/ui-components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToolBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clinical-trial-app';

  @ViewChild(MatAccordion) accordion!: MatAccordion;
}
