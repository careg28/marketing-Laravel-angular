export interface Contact {
  id: number;
  user_id?: number | null;
  name: string;
  email: string;
  message: string;
  response?: string | null;      
  responded_at?: string | null;  
  created_at?: string;
  updated_at?: string;
}