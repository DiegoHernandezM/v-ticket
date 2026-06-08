import prisma from '../../database/prisma';
import { CreateContactDTO, UpdateContactDTO } from './contact.types';

export class ContactRepository {
  private includeRelations = {
    client: true,
  };

  async create(data: CreateContactDTO) {
    return prisma.contact.create({
      data,
      include: this.includeRelations,
    });
  }

  async findAll() {
    return prisma.contact.findMany({
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
    return prisma.contact.findMany({
      where: {
        isActive: true,
        client: {
          companyId,
        },
      },
      include: this.includeRelations,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.contact.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: this.includeRelations,
    });
  }

  async findByIdAndCompany(id: number, companyId: number) {
    return prisma.contact.findFirst({
      where: {
        id,
        isActive: true,
        client: {
          companyId,
        },
      },
      include: this.includeRelations,
    });
  }

  async findByClientId(clientId: number) {
    return prisma.contact.findMany({
      where: {
        clientId,
        isActive: true,
      },
      include: this.includeRelations,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByClientIdAndCompany(
    clientId: number,
    companyId: number,
  ) {
    return prisma.contact.findMany({
      where: {
        clientId,
        isActive: true,
        client: {
          companyId,
        },
      },
      include: this.includeRelations,
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
      where: {
        id,
      },
      data,
      include: this.includeRelations,
    });
  }

  async delete(id: number) {
    return prisma.contact.update({
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