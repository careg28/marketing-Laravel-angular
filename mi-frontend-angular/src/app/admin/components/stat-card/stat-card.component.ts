import { Component, Input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatCard } from "@angular/material/card";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css'],
  imports: [MatIconModule, MatCard, RouterLink]
})
export class StatCardComponent {
  @Input() value = 0;
  @Input() label = '';
  @Input() icon = '';
  @Input() link = '';
}

