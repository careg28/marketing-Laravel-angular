import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AnimateInViewDirective } from '../../directives/animate-in-view.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, AnimateInViewDirective, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent { 

   year = new Date().getFullYear()
}
