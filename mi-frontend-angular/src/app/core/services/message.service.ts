import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { CreateMessageDto } from '../dto/create-message.dto';
import { environment } from '../../environments/enviroment';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/conversations`;

  // Listar todos los mensajes de una conversación
  getAll(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${conversationId}/messages`);
  }

  // Crear un mensaje en una conversación
  create(conversationId: number, dto: CreateMessageDto): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/${conversationId}/messages`, dto);
  }
}
