import prisma from '../../database/prisma';
import { CreateTicketAttachmentDTO } from './ticket-attachment.types';

export class TicketAttachmentRepository {
  private includeRelations = {
    ticket: true,
  };

  async create(data: CreateTicketAttachmentDTO) {
    return prisma.ticketAttachment.create({
      data,
      include: this.includeRelations,
    });
  }

  async findAll() {
    return prisma.ticketAttachment.findMany({
      include: this.includeRelations,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllByCompany(companyId: number) {
    return prisma.ticketAttachment.findMany({
      where: {
        ticket: {
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
    return prisma.ticketAttachment.findUnique({
      where: {
        id,
      },
      include: this.includeRelations,
    });
  }

  async findByIdAndCompany(id: number, companyId: number) {
    return prisma.ticketAttachment.findFirst({
      where: {
        id,
        ticket: {
          companyId,
        },
      },
      include: this.includeRelations,
    });
  }

  async findByTicketId(ticketId: number) {
    return prisma.ticketAttachment.findMany({
      where: {
        ticketId,
      },
      include: this.includeRelations,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByTicketIdAndCompany(ticketId: number, companyId: number) {
    return prisma.ticketAttachment.findMany({
      where: {
        ticketId,
        ticket: {
          companyId,
        },
      },
      include: this.includeRelations,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async delete(id: number) {
    return prisma.ticketAttachment.delete({
      where: {
        id,
      },
    });
  }
}