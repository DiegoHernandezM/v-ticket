export interface CreateCompanyDTO {
  name: string;
  businessName?: string;
  rfc?: string;
  email?: string;
  phone?: string;
  address?: string;
  logo?: string;
  subscriptionStatus?: string;
}

export interface UpdateCompanyDTO {
  name?: string;
  businessName?: string;
  rfc?: string;
  email?: string;
  phone?: string;
  address?: string;
  logo?: string;
  subscriptionStatus?: string;
  isActive?: boolean;
}