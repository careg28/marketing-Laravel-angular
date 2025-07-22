import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { ProjectService } from '../../../core/services/project.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { ContactService } from '../../../core/services/contact.service';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { CardsPackageComponent } from '../../components/cards-package/cards-package.component';
import { Conversation } from '../../../core/models/conversation.model';
import { Project } from '../../../core/models/project.model';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatCardComponent, CardsPackageComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Inyecciones
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private projectService = inject(ProjectService);
  private conversationService = inject(ConversationService);
  private contactService = inject(ContactService);

  // Variables de estado
  userName = 'Usuario';
  usersCount = 0;
  projectsCount = 0;
  messagesCount = 0;
  anonimousMessagesCount = 0;
  recentConversations: Conversation[] = [];
  projectos: Project[] = [];

  recentProjects = [
    { name: '', date: '', description: '' }
  ];

  ngOnInit(): void {
    this.cargarUsuarioActivo();
    this.cargarProyectos();
    this.contarUsuarios();
    this.contarProyectos();
    this.contarConversaciones();
    this.contarMensajesAnonimos();
  }

  private cargarUsuarioActivo(): void {
    this.authService.getUserActive().subscribe({
      next: (user: any) => this.userName = user.name,
      error: (err) => console.error('Error al obtener usuario activo', err)
    });
  }

  private cargarProyectos(): void {
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
  }

  private contarUsuarios(): void {
    this.userService.getAll().subscribe({
      next: (users) => this.usersCount = users.length,
      error: (err) => console.error('Error al contar usuarios', err)
    });
  }

  private contarProyectos(): void {
    this.projectService.getAll().subscribe({
      next: (projects) => this.projectsCount = projects.length,
      error: (err) => console.error('Error al contar proyectos', err)
    });
  }

  private contarConversaciones(): void {
    this.conversationService.getAll().subscribe({
      next: (convs) => {
        this.messagesCount = convs.length;
        this.recentConversations = convs
          .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
          .slice(0, 3);
      },
      error: (err) => console.error('Error al obtener conversaciones', err)
    });
  }

  private contarMensajesAnonimos(): void {
    this.contactService.getAll().subscribe({
      next: (contacts) => this.anonimousMessagesCount = contacts.length,
      error: (err) => console.error('Error al obtener mensajes anónimos', err)
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
