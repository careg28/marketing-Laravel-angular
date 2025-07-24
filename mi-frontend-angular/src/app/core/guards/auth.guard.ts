// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanMatch {
  constructor(private auth: AuthService, private router: Router) {}

  

  canActivate(): boolean | UrlTree {
    return this.check();
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
    if (!token || !role) return this.router.createUrlTree(['/login']);
  
    const basePath = segments[0]?.path;
  
    if (basePath === 'admin' && role !== 'admin') {
      return this.router.createUrlTree(['/usuarios/panel']);
    }
  
    if (basePath === 'usuarios' && role !== 'user') {
      return this.router.createUrlTree(['/admin/inicio']);
    }
  
    return true;
  }
  

  private check(): boolean | UrlTree {
    // Verifica si hay token/logueo (puedes mejorar esta lógica según tu AuthService)
    if (this.auth.isLoggedIn()) return true;
    return this.router.createUrlTree(['/login']);
  }
}
