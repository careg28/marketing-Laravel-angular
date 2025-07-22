export interface User {
  id: number;
  user_id: number;
  name: string;
  description?: string | null;
  status?: string | null;
  user?: User; //usuarios completos
  email_verified_at?: string | null;
}