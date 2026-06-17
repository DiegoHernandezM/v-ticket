export interface CreateSubscriptionPlanDTO {
  name: string;
  slug: string;
  description?: string;
  price: number;
  maxUsers?: number | null;
  maxTickets?: number | null;
}

export interface UpdateSubscriptionPlanDTO {
  name?: string;
  slug?: string;
  description?: string | null;
  price?: number;
  maxUsers?: number | null;
  maxTickets?: number | null;
  isActive?: boolean;
}