export interface CreateTicketCategoryDTO {
  companyId: number;
  name: string;
  slug: string;
  isActive?: boolean
}

export interface UpdateTicketCategoryDTO {
  name?: string;
  slug?: string;
  isActive?: boolean;
}