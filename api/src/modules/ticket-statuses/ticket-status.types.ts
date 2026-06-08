export interface CreateTicketStatusDTO {
  name: string;
  slug: string;
  color?: string;
  companyId: number | null;
}

export interface UpdateTicketStatusDTO {
  name?: string;
  slug?: string;
  color?: string;
  companyId: number | null;
}