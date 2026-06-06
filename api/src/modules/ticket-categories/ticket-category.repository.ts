import prisma from '../../database/prisma';
import { CreateTicketCategoryDTO, UpdateTicketCategoryDTO } from './ticket-category.types';

export class TicketCategoryRepository {
  async create(data: CreateTicketCategoryDTO) {
    return prisma.ticketCategory.create({
      data,
      include: {
        company: true,
      },
    });
  }

  async findAll() {
    return prisma.ticketCategory.findMany({
      include: {
        company: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.ticketCategory.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });
  }

  async findByCompanyId(companyId: number) {
    return prisma.ticketCategory.findMany({
      where: { companyId: companyId, isActive: true },
      include: {
        company: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findCompanyAndSlug(companyId: number, slug: string) {
    return prisma.ticketCategory.findFirst({
      where: {
        companyId: companyId,
        slug: slug
      },
    });
  }
  
  async update(id: number, data: UpdateTicketCategoryDTO) {
    return prisma.ticketCategory.update({
      where: { id },
      data,
      include: {
        company: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.ticketCategory.update({
      where: { id },
      data: {
        isActive: false,
      },
      include: {
        company: true,
      },
    });
  }
}
