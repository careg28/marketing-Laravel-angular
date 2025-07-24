import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private authService: AuthService,
    private router: Router
  ) {
    //  Tiempo de espera antes de considerarse inactivo (30 min)
    idle.setIdle(1800); // segundos
    idle.setTimeout(5); // segundos adicionales antes de cerrar sesión
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    //  Acción cuando se alcanza el timeout
    idle.onTimeout.subscribe(() => {
      alert("Tu Sesión ha expirado");
      this.authService.logout().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      });
    });

    idle.watch(); // comienza la vigilancia
  }
}

