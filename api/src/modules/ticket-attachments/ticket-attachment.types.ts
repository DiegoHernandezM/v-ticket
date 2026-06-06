export interface CreateTicketAttachmentDTO {
  ticketId: number;
  fileName: string;
  fileUrl: string;
  mimeType?: string;
  size?: number;
}