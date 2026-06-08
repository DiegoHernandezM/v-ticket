import prisma from '../../database/prisma';
import { CreateClientDTO, UpdateClientDTO } from './client.types';

export class ClientRepository {
  private includeRelations = {
    company: true,
    contacts: true,
  };

  async create(data: CreateClientDTO) {
    return prisma.client.create({
      data,
      include: this.includeRelations,
    });
  }

  async findAll() {
    return prisma.client.findMany({
      where: {
        isActive: true,
      },
      include: this.includeRelations,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllByCompany(companyId: number) {
    return prisma.client.findMany({
      where: {
        companyId,
        isActive: true,
      },
      include: this.includeRelations,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.client.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: this.includeRelations,
    });
  }

  async findByIdAndCompany(id: number, companyId: number) {
    return prisma.client.findFirst({
      where: {
        id,
        companyId,
        isActive: true,
      },
      include: this.includeRelations,
    });
  }

  async update(id: number, data: UpdateClientDTO) {
    return prisma.client.update({
      where: {
        id,
      },
      data,
      include: this.includeRelations,
    });
  }

  async delete(id: number) {
    return prisma.client.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
      include: this.includeRelations,
    });
  }
}