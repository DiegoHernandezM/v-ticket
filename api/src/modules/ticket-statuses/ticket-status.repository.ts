import prisma from '../../database/prisma';
import {
  CreateTicketStatusDTO,
  UpdateTicketStatusDTO,
} from './ticket-status.types';

export class TicketStatusRepository {
  async create(data: CreateTicketStatusDTO) {
    return prisma.ticketStatus.create({
      data,
    });
  }

  async findAll() {
    return prisma.ticketStatus.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findAllByCompany(companyId: number) {
    return prisma.ticketStatus.findMany({
      where: {
        companyId,
        isActive: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findById(id: number) {
    return prisma.ticketStatus.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async findByIdAndCompany(id: number, companyId: number) {
    return prisma.ticketStatus.findFirst({
      where: {
        id,
        companyId,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.ticketStatus.findFirst({
      where: {
        slug,
      },
    });
  }

  async findBySlugAndCompany(slug: string, companyId: number) {
    return prisma.ticketStatus.findFirst({
      where: {
        slug,
        companyId,
      },
    });
  }

  async update(id: number, data: UpdateTicketStatusDTO) {
    return prisma.ticketStatus.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.ticketStatus.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}