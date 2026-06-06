import prisma from '../../database/prisma';
import {
  CreateTicketStatusDTO,
  UpdateTicketStatusDTO,
} from './ticket-status.types';

export class TicketStatusRepository {
  async create(data: CreateTicketStatusDTO) {
    return prisma.ticketStatus.create({ data });
  }

  async findAll() {
    return prisma.ticketStatus.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findById(id: number) {
    return prisma.ticketStatus.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return prisma.ticketStatus.findUnique({
      where: { slug },
    });
  }

  async update(id: number, data: UpdateTicketStatusDTO) {
    return prisma.ticketStatus.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.ticketStatus.delete({
      where: { id },
    });
  }
}