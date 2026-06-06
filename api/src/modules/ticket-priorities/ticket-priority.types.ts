export interface CreateTicketPriorityDTO {
  companyId: number;
  name: string;
  slug: string;
  level: number;
  color?: string;
}

export interface UpdateTicketPriorityDTO {
  name?: string;
  slug?: string;
  level?: number;
  color?: string;
  isActive?: boolean;
}