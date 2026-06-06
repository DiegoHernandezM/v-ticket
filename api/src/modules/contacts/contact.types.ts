export interface CreateContactDTO {
  clientId: number;
  name: string;
  email?: string;
  phone?: string;
  position?: string;
  isPrimary?: boolean;
  isActive?: boolean;
}

export interface UpdateContactDTO {
  clientId?: number;
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  isPrimary?: boolean;
  isActive?: boolean;
}