export interface CreateMessageDto {
  user_id?: number;      
  message: string;
  is_admin?: boolean;    // true si es el admin respondiendo, false o undefined si es el usuario
}