import { AppError } from '../../utils/app-error';
import { TicketRepository } from '../tickets/ticket.repository';
import { UserRepository } from '../users/user.repository';
import { TicketCommentRepository } from './ticket-comment.repository';
import {
  CreateTicketCommentDTO,
  UpdateTicketCommentDTO,
} from './ticket-comment.types';

export class TicketCommentService {
  private commentRepository = new TicketCommentRepository();
  private ticketRepository = new TicketRepository();
  private userRepository = new UserRepository();

  async create(data: CreateTicketCommentDTO) {
    const ticket = await this.ticketRepository.findById(data.ticketId);

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return this.commentRepository.create(data);
  }

  async findAll() {
    return this.commentRepository.findAll();
  }

  async findById(id: number) {
    const comment = await this.commentRepository.findById(id);

    if (!comment) {
      throw new AppError('Comentario no encontrado', 404);
    }

    return comment;
  }

  async findByTicketId(ticketId: number) {
    const ticket = await this.ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    return this.commentRepository.findByTicketId(ticketId);
  }

  async update(id: number, data: UpdateTicketCommentDTO) {
    await this.findById(id);

    return this.commentRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.commentRepository.delete(id);
  }
}