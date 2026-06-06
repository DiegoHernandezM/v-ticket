export interface CreateTicketHistoryDTO {
  ticketId: number;
  userId?: number;
  action: string;
  oldValue?: string;
  newValue?: string;
}