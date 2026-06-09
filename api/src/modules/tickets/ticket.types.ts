export interface CreateTicketDTO {
  companyId: number;
  clientId: number;
  contactId?: number;
  statusId: number;
  categoryId?: number;
  priorityId?: number;
  createdById: number;
  assignedToId?: number;
  helpDeskTeamId?: number;
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
  title?: string | null;
  description?: string | null;
  helpDeskTeamId?: number | null;
  closedAt?: Date | null;
}

export interface AssignTicketDTO {
  assignedToId: number;
}