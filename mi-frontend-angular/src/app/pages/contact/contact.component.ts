import { Component } from '@angular/core';
import { ContactFormComponent } from "../../shared/components/contact-form/contact-form.component";
import { MatDivider } from "@angular/material/divider";
import { MatCardContent, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { AnimateInViewDirective } from '../../shared/directives/animate-in-view.directive';

@Component({
  selector: 'app-contact',
  imports: [ContactFormComponent, MatDivider, MatCardContent, MatCardModule, MatIconModule,AnimateInViewDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
