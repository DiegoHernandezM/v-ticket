import prisma from '../../database/prisma';
import { CreateTicketDTO, UpdateTicketDTO } from './ticket.types';

export class TicketRepository {
  async create(data: CreateTicketDTO & { code: string }) {
    return prisma.ticket.create({
      data,
      include: this.defaultInclude(),
    });
  }

  async findAll() {
    return prisma.ticket.findMany({
      include: this.defaultInclude(),
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.ticket.findUnique({
      where: { id },
      include: this.defaultInclude(),
    });
  }

  async findByCode(code: string) {
    return prisma.ticket.findUnique({
      where: { code },
      include: this.defaultInclude(),
    });
  }

  async findLastTicket() {
    return prisma.ticket.findFirst({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async update(id: number, data: UpdateTicketDTO) {
    return prisma.ticket.update({
      where: { id },
      data,
      include: this.defaultInclude(),
    });
  }

  private defaultInclude() {
    return {
      company: true,
      client: true,
      contact: true,
      status: true,
      category: true,
      priority: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      comments: true,
      attachments: true,
      history: true,
    };
  }

  async findAllByCompany(companyId: number) {
    return prisma.ticket.findMany({
      where: {
        companyId,
        isActive: true,
      },
      include: this.defaultInclude(),
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByIdAndCompany(id: number, companyId: number) {
    return prisma.ticket.findFirst({
      where: {
        id,
        companyId,
        isActive: true,
      },
      include: this.defaultInclude(),
    });
  }

  async findByCodeAndCompany(code: string, companyId: number) {
    return prisma.ticket.findFirst({
      where: {
        code,
        companyId,
        isActive: true,
      },
      include: this.defaultInclude(),
    });
  }
}