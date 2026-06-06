export interface CreateTicketCommentDTO {
  ticketId: number;
  userId: number;
  comment: string;
  isInternal?: boolean;
}

export interface UpdateTicketCommentDTO {
  comment?: string;
  isInternal?: boolean;
}