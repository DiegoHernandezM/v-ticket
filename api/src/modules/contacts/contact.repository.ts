import prisma from '../../database/prisma';
import { CreateContactDTO, UpdateContactDTO } from './contact.types';

export class ContactRepository {
  async create(data: CreateContactDTO) {
    return prisma.contact.create({
      data,
      include: {
        client: true,
      },
    });
  }

  async findAll() {
    return prisma.contact.findMany({
      include: {
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.contact.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });
  }

  async findByClientId(clientId: number) {
    return prisma.contact.findMany({
      where: {
        clientId,
        isActive: true,
      },
      include: {
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async unsetPrimaryContacts(clientId: number) {
    return prisma.contact.updateMany({
      where: {
        clientId,
        isPrimary: true,
      },
      data: {
        isPrimary: false,
      },
    });
  }

  async update(id: number, data: UpdateContactDTO) {
    return prisma.contact.update({
      where: { id },
      data,
      include: {
        client: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.contact.update({
      where: { id },
      data: {
        isActive: false,
      },
      include: {
        client: true,
      },
    });
  }
}