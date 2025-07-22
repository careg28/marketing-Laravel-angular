import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AnimateInViewDirective } from '../../directives/animate-in-view.directive';

@Component({
  selector: 'app-features-cards',
  imports: [CommonModule,MatCardModule, MatIconModule,AnimateInViewDirective],
  templateUrl: './features-cards.component.html',
  styleUrl: './features-cards.component.css'
})
export class FeaturesCardsComponent {
features = [
    {
      icon: 'rocket_launch',
      title: 'Resultados rápidos y medibles',
      color: '#1976d2'
    },
    {
      icon: 'handshake',
      title: 'Trato personalizado',
      color: '#43a047'
    },
    {
      icon: 'extension',
      title: 'Integraciones a medida',
      color: '#fb8c00'
    },
    {
      icon: 'public',
      title: 'Soluciones escalables',
      color: '#6d4aff'
    }
  ];
}
