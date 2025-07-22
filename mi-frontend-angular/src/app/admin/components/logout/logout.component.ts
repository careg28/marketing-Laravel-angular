import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-logout',
  imports: [MatIconModule,NgClass],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
  
})
export class LogoutComponent {
  //  input semántico para definir el contexto visual
  @Input() context: 'toolbar' | 'sidebar' = 'sidebar';

  //  inyección de servicios
  private authService = inject(AuthService);
  private router = inject(Router);

  //  función que devuelve la clase según el contexto
  getPositionClass(): string {
    return this.context === 'toolbar' ? 'logout-toolbar' : 'logout-sidebar';
  }

  //  lógica de logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
