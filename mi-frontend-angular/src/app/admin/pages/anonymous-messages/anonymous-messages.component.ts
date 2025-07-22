import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ContactService } from '../../../core/services/contact.service';
import { Contact } from '../../../core/models/contact.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-anonymous-messages',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, NgIf, MatIconModule],
  templateUrl: './anonymous-messages.component.html',
  styleUrls: ['./anonymous-messages.component.css']
})
export class AnonymousMessagesComponent implements OnInit {
  private contactService = inject(ContactService);

  messages: Contact[] = [];
  displayedColumns = ['id', 'name', 'email', 'message', 'created_at', 'actions'];

  ngOnInit(): void {
    this.contactService.getAll().subscribe({
      next: (contacts) => this.messages = contacts,
      error: (err) => console.error('Error al obtener mensajes anónimos', err)
    });
  }

  responderPorCorreo(email: string): void {
    window.open(`mailto:${email}`, '_blank');
  }
}

