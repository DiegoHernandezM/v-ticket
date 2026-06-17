export type CompanySubscriptionStatus =
  | 'trial'
  | 'active'
  | 'expired'
  | 'cancelled';

export interface CreateCompanySubscriptionDTO {
  companyId: number;
  planId: number;
  status?: CompanySubscriptionStatus;
  startsAt?: Date | string;
  endsAt?: Date | string | null;
  trialEndsAt?: Date | string | null;
}

export interface UpdateCompanySubscriptionDTO {
  planId?: number;
  status?: CompanySubscriptionStatus;
  startsAt?: Date | string;
  endsAt?: Date | string | null;
  trialEndsAt?: Date | string | null;
}