export interface CreateTicketDTO {
  companyId: number;
  clientId: number;
  contactId?: number;
  statusId: number;
  categoryId?: number;
  priorityId?: number;
  createdById: number;
  assignedToId?: number;
  title: string;
  description: string;
}

export interface UpdateTicketDTO {
  clientId?: number;
  contactId?: number | null;
  statusId?: number;
  categoryId?: number | null;
  priorityId?: number | null;
  assignedToId?: number | null;
  title?: string;
  description?: string;
  closedAt?: Date | null;
}