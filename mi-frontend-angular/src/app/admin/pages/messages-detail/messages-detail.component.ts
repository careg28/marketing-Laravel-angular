import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../core/services/message.service';
import { ConversationService } from '../../../core/services/conversation.service';
import { Message } from '../../../core/models/message.model';
import { Conversation } from '../../../core/models/conversation.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-messages-detail',
  standalone: true,
  imports: [
    CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    FormsModule, ReactiveFormsModule
  ],
  templateUrl: './messages-detail.component.html',
  styleUrls: ['./messages-detail.component.css']
})
export class MessagesDetailComponent implements OnInit {
  private messageService = inject(MessageService);
  private conversationService = inject(ConversationService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  conversation: Conversation | null = null;
  messages: Message[] = [];
  responseForm = this.fb.group({
    message: ['', [Validators.required, Validators.minLength(2)]]
  });
  loading = false;
  sent = false;
  error = '';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.conversationService.getById(id).subscribe({
      next: (conv) => {
        this.conversation = conv;
      },
      error: () => {
        this.error = 'No se pudo cargar la conversación.';
      }
    });

    this.messageService.getAll(id).subscribe({
      next: (msgs) => this.messages = msgs,
      error: () => this.error = 'No se pudieron cargar los mensajes.'
    });
  }

  sendResponse() {
    if (this.responseForm.invalid || !this.conversation) {
      this.responseForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const dto = {
      message: this.responseForm.value.message ?? '',
      is_admin: true // O usa el user_id del admin si quieres más control
    };
    this.messageService.create(this.conversation.id, dto).subscribe({
      next: (msg) => {
        this.sent = true;
        this.loading = false;
        this.responseForm.reset();
        this.messages.push(msg); // añade el nuevo mensaje al historial
      },
      error: () => {
        this.error = 'Error al enviar el mensaje';
        this.loading = false;
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/messages']);
  }
}
