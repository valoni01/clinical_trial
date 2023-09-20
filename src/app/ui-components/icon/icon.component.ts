import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

type IconColor = 'default' | 'danger' | 'info' | 'active';

@Component({
  selector: 'app-icon',
  host: {
    '[class.danger]': "iconType === 'danger'",
    '[class.default]': "iconType === 'default'",
    '[class.active]': "iconType === 'active'",
  },
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() iconType: IconColor = 'default';
}
