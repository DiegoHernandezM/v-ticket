export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}