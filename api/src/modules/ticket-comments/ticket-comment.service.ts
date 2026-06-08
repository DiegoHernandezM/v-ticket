import { AppError } from '../../utils/app-error';
import { AuthUser } from '../../types/auth-user.type';
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

  async create(data: CreateTicketCommentDTO, authUser: AuthUser) {
    const ticket =
      authUser.role === 'super_admin'
        ? await this.ticketRepository.findById(data.ticketId)
        : await this.ticketRepository.findByIdAndCompany(
            data.ticketId,
            authUser.companyId!,
          );

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    const user = await this.userRepository.findById(authUser.id);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return this.commentRepository.create({
      ...data,
      userId: authUser.id,
    });
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.commentRepository.findAll();
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.commentRepository.findAllByCompany(authUser.companyId);
  }

  async findById(id: number, authUser: AuthUser) {
    const comment =
      authUser.role === 'super_admin'
        ? await this.commentRepository.findById(id)
        : await this.commentRepository.findByIdAndCompany(
            id,
            authUser.companyId!,
          );

    if (!comment) {
      throw new AppError('Comentario no encontrado', 404);
    }

    return comment;
  }

  async findByTicketId(ticketId: number, authUser: AuthUser) {
    const ticket =
      authUser.role === 'super_admin'
        ? await this.ticketRepository.findById(ticketId)
        : await this.ticketRepository.findByIdAndCompany(
            ticketId,
            authUser.companyId!,
          );

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    return authUser.role === 'super_admin'
      ? this.commentRepository.findByTicketId(ticketId)
      : this.commentRepository.findByTicketIdAndCompany(
          ticketId,
          authUser.companyId!,
        );
  }

  async update(
    id: number,
    data: UpdateTicketCommentDTO,
    authUser: AuthUser,
  ) {
    await this.findById(id, authUser);

    return this.commentRepository.update(id, data);
  }

  async delete(id: number, authUser: AuthUser) {
    await this.findById(id, authUser);

    return this.commentRepository.delete(id);
  }
}