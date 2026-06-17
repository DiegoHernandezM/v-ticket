export interface CreateNotificationDTO {
  companyId: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  ticketId?: number;
}

export interface UpdateNotificationDTO {
  isRead?: boolean;
}