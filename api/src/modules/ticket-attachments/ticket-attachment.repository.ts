import prisma from '../../database/prisma';
import { CreateTicketAttachmentDTO } from './ticket-attachment.types';

export class TicketAttachmentRepository {
  async create(data: CreateTicketAttachmentDTO) {
    return prisma.ticketAttachment.create({
      data,
      include: {
        ticket: true,
      },
    });
  }

  async findAll() {
    return prisma.ticketAttachment.findMany({
      include: {
        ticket: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.ticketAttachment.findUnique({
      where: { id },
      include: {
        ticket: true,
      },
    });
  }

  async findByTicketId(ticketId: number) {
    return prisma.ticketAttachment.findMany({
      where: {
        ticketId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async delete(id: number) {
    return prisma.ticketAttachment.delete({
      where: { id },
    });
  }
}