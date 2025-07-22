import { User } from "./user.model";

export interface Project {
 id: number;
  user_id: number;
  name: string;
  description?: string | null;
  status?: string | null;
  estimated_days?: number; // <-- este campo
  created_at?: string;     // <-- la fecha de creación
  user?: User;
}