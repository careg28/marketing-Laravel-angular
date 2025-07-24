import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-user-menu-perfil',
  imports: [MatMenuModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './user-menu-perfil.component.html',
  styleUrl: './user-menu-perfil.component.css'
})
export class UserMenuPerfilComponent {
  name = localStorage.getItem('name');
  role = localStorage.getItem('role');
  menuVisible = false;

  constructor(private router: Router) {}

  goToPanel(): void {
    if (this.role === 'admin') {
      this.router.navigate(['/admin/inicio']);
    } else {
      this.router.navigate(['/usuarios/panel']);
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
