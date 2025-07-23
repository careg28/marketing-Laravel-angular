import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';


export const routes: Routes = [
  // Rutas públicas
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), pathMatch: 'full' },
      { path: 'projectos', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent) },
      { path: 'servicios', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
      { path: 'contacto', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
      { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'registro', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)},
      { path: 'nuestro-proceso', loadComponent: () => import('./pages/nuestro-proceso/nuestro-proceso.component').then(m => m.NuestroProcesoComponent) }

    ]
  },
  // Rutas admin protegidas
  {
    path: 'admin',
    canMatch: [AuthGuard],
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', loadComponent: () => import('./admin/pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'usuarios', loadComponent: () => import('./admin/pages/users/users.component').then(m => m.UsersComponent) },
      { path: 'projectos', loadComponent: () => import('./admin/pages/projects/projects.component').then(m => m.ProjectsComponent) },
      { path: 'mensajes', loadComponent: () => import('./admin/pages/messages/messages.component').then(m => m.MessagesComponent) },
      { path: 'mensaje/:id', loadComponent: () => import('./admin/pages/messages-detail/messages-detail.component').then(m => m.MessagesDetailComponent) },
      { path: 'paquetes', loadComponent: () => import('./admin/pages/packages/packages-list.component').then(m => m.PackagesListComponent) },
      { path: 'mensajes-anonimos', loadComponent: () => import('./admin/pages/anonymous-messages/anonymous-messages.component').then(m => m.AnonymousMessagesComponent) },
    ]
  },
  // Redirección si no existe la ruta
  { path: '**', redirectTo: '', pathMatch: 'full' }
];