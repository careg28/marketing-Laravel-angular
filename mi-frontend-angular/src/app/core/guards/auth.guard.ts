// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanMatch {
  constructor(private auth: AuthService, private router: Router) {}

  

  canActivate(): boolean | UrlTree {
    return this.check();
  }

  canMatch(): boolean | UrlTree {
    return this.check();
  }

  private check(): boolean | UrlTree {
    // Verifica si hay token/logueo (puedes mejorar esta lógica según tu AuthService)
    if (this.auth.isLoggedIn()) return true;
    return this.router.createUrlTree(['/login']);
  }
}
