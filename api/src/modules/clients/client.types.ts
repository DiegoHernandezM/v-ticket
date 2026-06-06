export interface CreateClientDTO {
  companyId: number;
  name: string;
  rfc?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}

export interface UpdateClientDTO {
  companyId?: number;
  name?: string;
  rfc?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}