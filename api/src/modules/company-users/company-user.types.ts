export interface CreateCompanyUserDTO {
  companyId?: number;
  userId: number;
  roleId: number;
  isActive?: boolean;
}

export interface UpdateCompanyUserDTO {
  companyId?: number;
  userId?: number;
  roleId?: number;
  isActive?: boolean;
}