import prisma from '../../database/prisma';
import { CreateTicketHistoryDTO } from './ticket-history.types';

export class TicketHistoryRepository {
  async create(data: CreateTicketHistoryDTO) {
    return prisma.ticketHistory.create({
      data,
      include: this.defaultInclude(),
    });
  }

  async findAll() {
    return prisma.ticketHistory.findMany({
      include: this.defaultInclude(),
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllByCompany(companyId: number) {
    return prisma.ticketHistory.findMany({
      where: {
        ticket: {
          companyId,
        },
      },
      include: this.defaultInclude(),
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.ticketHistory.findUnique({
      where: {
        id,
      },
      include: this.defaultInclude(),
    });
  }

  async findByIdAndCompany(
    id: number,
    companyId: number,
  ) {
    return prisma.ticketHistory.findFirst({
      where: {
        id,
        ticket: {
          companyId,
        },
      },
      include: this.defaultInclude(),
    });
  }

  async findByTicketId(ticketId: number) {
    return prisma.ticketHistory.findMany({
      where: {
        ticketId,
      },
      include: this.defaultInclude(),
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findByTicketIdAndCompany(
    ticketId: number,
    companyId: number,
  ) {
    return prisma.ticketHistory.findMany({
      where: {
        ticketId,
        ticket: {
          companyId,
        },
      },
      include: this.defaultInclude(),
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  private defaultInclude() {
    return {
      ticket: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    };
  }
}