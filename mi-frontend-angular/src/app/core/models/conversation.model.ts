import { Message } from './message.model';
export interface Conversation {
  id: number;
  user_id: number;
  subject: string;
  created_at: string;
  updated_at: string;
  is_closed?: boolean;
  messages?: Message[];
  user?: { id: number; name: string };
  last_message?: {
    id: number;
    message: string;
    is_admin: boolean;
    created_at: string;
    user_id?: number;
  };
}