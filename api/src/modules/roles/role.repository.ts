import prisma from '../../database/prisma';
import { CreateRoleDTO, UpdateRoleDTO } from './role.types';

export class RoleRepository {
  async create(data: CreateRoleDTO) {
    return prisma.role.create({ data });
  }

  async findAll() {
    return prisma.role.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.role.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return prisma.role.findUnique({
      where: { slug },
    });
  }

  async update(id: number, data: UpdateRoleDTO) {
    return prisma.role.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.role.delete({
      where: { id },
    });
  }
}