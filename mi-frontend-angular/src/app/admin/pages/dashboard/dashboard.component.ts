import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { ProjectService } from '../../../core/services/project.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { StatCardComponent } from "../../components/stat-card/stat-card.component";
import { Conversation } from '../../../core/models/conversation.model';
import { CardsPackageComponent } from '../../components/cards-package/cards-package.component';
import { Project } from '../../../core/models/project.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatCardComponent,CardsPackageComponent ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Inyecciones
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private projectService = inject(ProjectService);
  private conversationService = inject(ConversationService);

  userName = 'Usuario'; 
  usersCount = 0;
  projectsCount = 0;
  messagesCount = 0;
  recentConversations: Conversation[] = [];
  projectos : Project[]=[];

  // Ejemplo estático
  recentProjects = [
    { name: '', date: '', description:'' },];

 

  ngOnInit(): void {
    // Usuario actual
    this.authService.getUserActive().subscribe({
      next: (user: any) => this.userName = user.name,
      error: (err) => console.error('Error al obtener usuario activo', err)
    });

    // Usuario actual
    this.projectService.getAll().subscribe({
      next: (proyectos) => {
        this.projectos = proyectos;
    
        this.recentProjects = proyectos.map(p => ({
           name: p.name,
           date: p.created_at ? this.formatearFecha(p.created_at) : 'Fecha no disponible',
           description: p.description ?? 'Sin descripción'
        }));
      },
      error: (err) => console.error('Error al obtener proyectos', err),
      complete: () => console.log('Proyectos recibidos:', this.recentProjects)
    });
    

    // Usuarios
    this.userService.getAll().subscribe(users => this.usersCount = users.length);

    // Proyectos
    this.projectService.getAll().subscribe(projects => this.projectsCount = projects.length);

    // Trae todas o solo las últimas (limit=3)
    this.conversationService.getAll().subscribe(convs => {
    this.messagesCount = convs.length;
    // Las más recientes
    this.recentConversations = convs
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .slice(0, 3);
  });
  }

  private formatearFecha(fechaOriginal: string | Date): string {
    const fecha = new Date(fechaOriginal);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
}
