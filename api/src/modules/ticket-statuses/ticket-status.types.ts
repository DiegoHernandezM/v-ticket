export interface CreateTicketStatusDTO {
  name: string;
  slug: string;
  color?: string;
}

export interface UpdateTicketStatusDTO {
  name?: string;
  slug?: string;
  color?: string;
}