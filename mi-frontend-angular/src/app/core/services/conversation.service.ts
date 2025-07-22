import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Conversation} from '../models/conversation.model';
import { environment } from '../../environments/enviroment';
import { CreateConversationDto } from '../dto/create-conversation.dto';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/conversations`;

  // Listar conversaciones
  getAll(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.apiUrl);
  }

  // Obtener una conversación por ID
  getById(id: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva conversación
  create(data: CreateConversationDto): Observable<Conversation> {
    return this.http.post<Conversation>(this.apiUrl, data);
  }

  getRecent(limit = 3) {
  return this.http.get<Conversation[]>(`${this.apiUrl}?limit=${limit}`);
}
}
