import { AppError } from '../../utils/app-error';
import { TicketRepository } from '../tickets/ticket.repository';
import { UserRepository } from '../users/user.repository';
import { TicketHistoryRepository } from './ticket-history.repository';
import { CreateTicketHistoryDTO } from './ticket-history.types';

export class TicketHistoryService {
  private historyRepository = new TicketHistoryRepository();
  private ticketRepository = new TicketRepository();
  private userRepository = new UserRepository();

  async create(data: CreateTicketHistoryDTO) {
    const ticket = await this.ticketRepository.findById(data.ticketId);

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    if (data.userId) {
      const user = await this.userRepository.findById(data.userId);

      if (!user) {
        throw new AppError('Usuario no encontrado', 404);
      }
    }

    return this.historyRepository.create(data);
  }

  async findAll() {
    return this.historyRepository.findAll();
  }

  async findById(id: number) {
    const history = await this.historyRepository.findById(id);

    if (!history) {
      throw new AppError('Historial no encontrado', 404);
    }

    return history;
  }

  async findByTicketId(ticketId: number) {
    const ticket = await this.ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    return this.historyRepository.findByTicketId(ticketId);
  }
}