import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AnimateInViewDirective } from '../../directives/animate-in-view.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, AnimateInViewDirective,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
