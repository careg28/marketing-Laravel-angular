import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { MatTableModule } from '@angular/material/table'; // Angular Material Table
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { ConversationService } from '../../../core/services/conversation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule,RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private conversationService = inject(ConversationService);
  conversationMap: Record<number, number> = {}; // userId → conversationId


  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role','mensaje'];

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
  
      // Carga las conversaciones después
      this.conversationService.getAll().subscribe(conversations => {
        for (let conversation of conversations) {
          this.conversationMap[conversation.user_id] = conversation.id;
        }
      });
    });
  }

   // 🔍 Función que busca el ID de conversación del usuario
   getConversationId(userId: number): number {
    return this.conversationMap[userId] || 0;
  }

  
 
  

}


