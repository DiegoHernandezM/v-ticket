import prisma from '../../database/prisma';
import {
  CreateTicketPriorityDTO,
  UpdateTicketPriorityDTO,
} from './ticket-priority.types';

export class TicketPriorityRepository {
  async create(data: CreateTicketPriorityDTO) {
    return prisma.ticketPriority.create({
      data,
      include: {
        company: true,
      },
    });
  }

  async findAll() {
    return prisma.ticketPriority.findMany({
      include: {
        company: true,
      },
      orderBy: {
        level: 'asc',
      },
    });
  }

  async findById(id: number) {
    return prisma.ticketPriority.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });
  }

  async findByCompanyAndSlug(
    companyId: number,
    slug: string,
  ) {
    return prisma.ticketPriority.findFirst({
      where: {
        companyId,
        slug,
      },
    });
  }

  async update(
    id: number,
    data: UpdateTicketPriorityDTO,
  ) {
    return prisma.ticketPriority.update({
      where: { id },
      data,
      include: {
        company: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.ticketPriority.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}