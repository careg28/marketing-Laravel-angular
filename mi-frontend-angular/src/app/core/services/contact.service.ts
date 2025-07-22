import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/enviroment';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { CreateContactDto } from '../dto/create-contact.dto'; // <-- importa el DTO

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/contact`;

  // DTO para mensaje de formulario por primera vez sin usuario registrado
  sendMessage(payload: CreateContactDto): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, payload);
  }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  respond(id: number, response: string): Observable<Contact> {
    return this.http.patch<Contact>(`${this.apiUrl}/${id}`, { response });
  }
}
