import { AppError } from '../../utils/app-error';
import { AuthUser } from '../../types/auth-user.type';
import { TicketRepository } from '../tickets/ticket.repository';
import { UserRepository } from '../users/user.repository';
import { TicketHistoryRepository } from './ticket-history.repository';
import { CreateTicketHistoryDTO } from './ticket-history.types';

export class TicketHistoryService {
  private historyRepository = new TicketHistoryRepository();
  private ticketRepository = new TicketRepository();
  private userRepository = new UserRepository();

  async create(data: CreateTicketHistoryDTO, authUser: AuthUser) {
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

    if (data.userId) {
      const user = await this.userRepository.findById(data.userId);

      if (!user) {
        throw new AppError('Usuario no encontrado', 404);
      }
    }

    return this.historyRepository.create({
      ...data,
      userId: data.userId ?? authUser.id,
    });
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.historyRepository.findAll();
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.historyRepository.findAllByCompany(authUser.companyId);
  }

  async findById(id: number, authUser: AuthUser) {
    const history =
      authUser.role === 'super_admin'
        ? await this.historyRepository.findById(id)
        : await this.historyRepository.findByIdAndCompany(
            id,
            authUser.companyId!,
          );

    if (!history) {
      throw new AppError('Historial no encontrado', 404);
    }

    return history;
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
      ? this.historyRepository.findByTicketId(ticketId)
      : this.historyRepository.findByTicketIdAndCompany(
          ticketId,
          authUser.companyId!,
        );
  }
}