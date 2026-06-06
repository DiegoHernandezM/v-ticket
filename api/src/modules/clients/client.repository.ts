import prisma from '../../database/prisma';
import { CreateClientDTO, UpdateClientDTO } from './client.types';

export class ClientRepository {
  async create(data: CreateClientDTO) {
    return prisma.client.create({
      data,
      include: {
        company: true,
        contacts: true,
      },
    });
  }

  async findAll() {
    return prisma.client.findMany({
      include: {
        company: true,
        contacts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.client.findUnique({
      where: { id },
      include: {
        company: true,
        contacts: true,
      },
    });
  }

  async update(id: number, data: UpdateClientDTO) {
    return prisma.client.update({
      where: { id },
      data,
      include: {
        company: true,
        contacts: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.client.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}