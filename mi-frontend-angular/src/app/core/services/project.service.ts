import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model'; // Ajusta la ruta si es necesario
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects`; // Cambia a tu URL real
  private http = inject(HttpClient);

  // Listar todos los proyectos
  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Obtener un proyecto por ID
  getById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Crear un proyecto
  create(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  // Actualizar un proyecto
  update(id: number, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  // Eliminar un proyecto
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

