import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../admin/components/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { NgIf } from '@angular/common';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { LogoutComponent } from "../../admin/components/logout/logout.component";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    MatSidenavModule,
    MatToolbar,
    MatIconModule,
    NgIf,
    LogoutComponent
],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  private router = inject(Router);
  isDesktop = false;
  urlActual: string = '';
  nombreUrl:string = '';

  ngOnInit() {
    const rutaCompleta = this.router.url; // por ejemplo: /admin/panel/configuracion
    const segmentos = rutaCompleta.split('/');
    this.nombreUrl = segmentos.pop() || ''; // resultado: 'configuracion'

    
  }


}
