import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { BtnEscribenosComponent } from "../btn-escribenos/btn-escribenos.component";
import { UserMenuPerfilComponent } from "../user-menu-perfil/user-menu-perfil.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterLink,
    RouterModule // Importamos RouterModule para que Angular reconozca routerLinkActiveOptions
    ,
    BtnEscribenosComponent,
    UserMenuPerfilComponent,
    NgIf
],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 menuOpen = false;
 name = localStorage.getItem('name');
}
