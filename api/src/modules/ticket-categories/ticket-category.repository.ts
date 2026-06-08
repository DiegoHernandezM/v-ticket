import prisma from '../../database/prisma';
import {
  CreateTicketCategoryDTO,
  UpdateTicketCategoryDTO,
} from './ticket-category.types';

export class TicketCategoryRepository {
  private includeRelations = {
    company: true,
  };

  async create(data: CreateTicketCategoryDTO) {
    return prisma.ticketCategory.create({
      data,
      include: this.includeRelations,
    });
  }

  async findAll() {
    return prisma.ticketCategory.findMany({
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
    return prisma.ticketCategory.findMany({
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
    return prisma.ticketCategory.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: this.includeRelations,
    });
  }

  async findByIdAndCompany(
    id: number,
    companyId: number,
  ) {
    return prisma.ticketCategory.findFirst({
      where: {
        id,
        companyId,
        isActive: true,
      },
      include: this.includeRelations,
    });
  }

  async findByCompanyId(companyId: number) {
    return prisma.ticketCategory.findMany({
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

  async findCompanyAndSlug(
    companyId: number,
    slug: string,
  ) {
    return prisma.ticketCategory.findFirst({
      where: {
        companyId,
        slug,
        isActive: true,
      },
      include: this.includeRelations,
    });
  }

  async update(
    id: number,
    data: UpdateTicketCategoryDTO,
  ) {
    return prisma.ticketCategory.update({
      where: {
        id,
      },
      data,
      include: this.includeRelations,
    });
  }

  async delete(id: number) {
    return prisma.ticketCategory.update({
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