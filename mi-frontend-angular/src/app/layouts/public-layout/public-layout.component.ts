import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css'], // si quieres estilos
})
export class PublicLayoutComponent {}
