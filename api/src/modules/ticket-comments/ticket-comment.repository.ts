import prisma from '../../database/prisma';
import {
  CreateTicketCommentDTO,
  UpdateTicketCommentDTO,
} from './ticket-comment.types';

export class TicketCommentRepository {
  async create(data: CreateTicketCommentDTO) {
    return prisma.ticketComment.create({
      data,
      include: this.defaultInclude(),
    });
  }

  async findAll() {
    return prisma.ticketComment.findMany({
      include: this.defaultInclude(),
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.ticketComment.findUnique({
      where: { id },
      include: this.defaultInclude(),
    });
  }

  async findByTicketId(ticketId: number) {
    return prisma.ticketComment.findMany({
      where: {
        ticketId,
      },
      include: this.defaultInclude(),
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async update(id: number, data: UpdateTicketCommentDTO) {
    return prisma.ticketComment.update({
      where: { id },
      data,
      include: this.defaultInclude(),
    });
  }

  async delete(id: number) {
    return prisma.ticketComment.delete({
      where: { id },
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
          isActive: true,
        },
      },
    };
  }
}