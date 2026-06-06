export interface CreateRoleDTO {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateRoleDTO {
  name?: string;
  slug?: string;
  description?: string;
}