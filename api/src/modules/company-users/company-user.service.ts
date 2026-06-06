import { AppError } from '../../utils/app-error';
import { CompanyRepository } from '../companies/company.repository';
import { RoleRepository } from '../roles/role.repository';
import { UserRepository } from '../users/user.repository';
import { CompanyUserRepository } from './company-user.repository';
import {
  CreateCompanyUserDTO,
  UpdateCompanyUserDTO,
} from './company-user.types';

export class CompanyUserService {
  private companyUserRepository = new CompanyUserRepository();
  private companyRepository = new CompanyRepository();
  private userRepository = new UserRepository();
  private roleRepository = new RoleRepository();

  async create(data: CreateCompanyUserDTO) {
    if (data.companyId) {
      const company = await this.companyRepository.findById(data.companyId);

      if (!company) {
        throw new AppError('Empresa no encontrada', 404);
      }
    }

    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const role = await this.roleRepository.findById(data.roleId);

    if (!role) {
      throw new AppError('Rol no encontrado', 404);
    }

    const existingAssignment =
      await this.companyUserRepository.findByCompanyUserRole(
        data.companyId ?? null,
        data.userId,
        data.roleId,
      );

    if (existingAssignment) {
      throw new AppError('Este usuario ya tiene ese rol asignado en la empresa', 400);
    }

    return this.companyUserRepository.create(data);
  }

  async findAll() {
    return this.companyUserRepository.findAll();
  }

  async findById(id: number) {
    const companyUser = await this.companyUserRepository.findById(id);

    if (!companyUser) {
      throw new AppError('Asignación no encontrada', 404);
    }

    return companyUser;
  }

  async update(id: number, data: UpdateCompanyUserDTO) {
    const currentAssignment = await this.findById(id);

    const companyId = data.companyId ?? currentAssignment.companyId;
    const userId = data.userId ?? currentAssignment.userId;
    const roleId = data.roleId ?? currentAssignment.roleId;

    if (companyId) {
      const company = await this.companyRepository.findById(companyId);

      if (!company) {
        throw new AppError('Empresa no encontrada', 404);
      }
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const role = await this.roleRepository.findById(roleId);

    if (!role) {
      throw new AppError('Rol no encontrado', 404);
    }

    const existingAssignment =
      await this.companyUserRepository.findByCompanyUserRole(
        companyId ?? null,
        userId,
        roleId,
      );

    if (existingAssignment && existingAssignment.id !== id) {
      throw new AppError('Ya existe una asignación con esos datos', 400);
    }

    return this.companyUserRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.companyUserRepository.delete(id);
  }
}