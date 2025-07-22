import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);
  projects: Project[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'status',
    'user_name',
    'user_email',
    'remaining_days'
  ];

  ngOnInit() {
    this.projectService.getAll().subscribe(projects => this.projects = projects);
  }

  getRemainingDays(project: Project): string {
  if (!project.estimated_days || !project.created_at) return 'Sin estimar';

  const createdAt = new Date(project.created_at);
  const now = new Date();

  // Días transcurridos desde la creación
  const msInDay = 24 * 60 * 60 * 1000;
  const daysPassed = Math.floor((now.getTime() - createdAt.getTime()) / msInDay);

  // Días restantes
  const remaining = project.estimated_days - daysPassed;

  if (remaining <= 0) return 'Finalizado';
  if (remaining === 1) return '1 día';
  return `${remaining} días`;
}
}
