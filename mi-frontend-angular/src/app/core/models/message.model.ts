export interface Message {
  id: number;
  conversation_id: number;
  user_id: number | null;
  message: string;
  is_admin: boolean;
  created_at?: string;
  updated_at?: string;
}