export interface CreateContactDto {
  name: string;
  email: string;
  message: string;
  tel?: string | null; 
}
