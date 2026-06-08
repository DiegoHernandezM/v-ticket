export type AuthUser = {
  id: number;
  email: string;
  role: string;
  companyId: number | null;
};