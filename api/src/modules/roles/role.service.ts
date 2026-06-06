import { AppError } from '../../utils/app-error';
import { RoleRepository } from './role.repository';
import { CreateRoleDTO, UpdateRoleDTO } from './role.types';

export class RoleService {
  private roleRepository = new RoleRepository();

  async create(data: CreateRoleDTO) {
    const roleWithSameSlug = await this.roleRepository.findBySlug(data.slug);

    if (roleWithSameSlug) {
      throw new AppError('Ya existe un rol registrado con ese slug', 400);
    }

    return this.roleRepository.create(data);
  }

  async findAll() {
    return this.roleRepository.findAll();
  }

  async findById(id: number) {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new AppError('Rol no encontrado', 404);
    }

    return role;
  }

  async update(id: number, data: UpdateRoleDTO) {
    await this.findById(id);

    if (data.slug) {
      const roleWithSameSlug = await this.roleRepository.findBySlug(data.slug);

      if (roleWithSameSlug && roleWithSameSlug.id !== id) {
        throw new AppError('Ya existe otro rol registrado con ese slug', 400);
      }
    }

    return this.roleRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.roleRepository.delete(id);
  }
}