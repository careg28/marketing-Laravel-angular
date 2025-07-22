import { Component, OnInit, inject } from '@angular/core';
import { ConversationService } from '../../../core/services/conversation.service';
import { Conversation } from '../../../core/models/conversation.model';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MatTableModule, DatePipe, NgIf, NgClass],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  private conversationService = inject(ConversationService);
  private router = inject(Router);

  conversations: Conversation[] = [];
  displayedColumns = ['id', 'user', 'subject', 'created_at', 'status', 'actions'];

  ngOnInit() {
    this.conversationService.getAll().subscribe(convs => this.conversations = convs);
  }

  goToDetail(id: number) {
    this.router.navigate(['/admin/mensaje', id]);
  }

  // Ejemplo: si quieres un campo status (puedes mejorar esto con lógica real)
  getStatus(conv: Conversation) {
    return conv.is_closed ? 'Cerrada' : 'Abierta';
  }
}
