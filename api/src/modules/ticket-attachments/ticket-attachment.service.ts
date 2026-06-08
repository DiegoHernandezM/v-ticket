import { AppError } from '../../utils/app-error';
import { AuthUser } from '../../types/auth-user.type';
import { TicketRepository } from '../tickets/ticket.repository';
import { TicketHistoryRepository } from '../ticket-history/ticket-history.repository';
import { TicketAttachmentRepository } from './ticket-attachment.repository';
import { CreateTicketAttachmentDTO } from './ticket-attachment.types';

export class TicketAttachmentService {
  private attachmentRepository = new TicketAttachmentRepository();
  private ticketRepository = new TicketRepository();
  private historyRepository = new TicketHistoryRepository();

  async create(data: CreateTicketAttachmentDTO, authUser: AuthUser) {
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

    const attachment = await this.attachmentRepository.create(data);

    await this.historyRepository.create({
      ticketId: data.ticketId,
      userId: authUser.id,
      action: 'ATTACHMENT_ADDED',
      oldValue: null,
      newValue: data.fileName,
    });

    return attachment;
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.attachmentRepository.findAll();
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.attachmentRepository.findAllByCompany(authUser.companyId);
  }

  async findById(id: number, authUser: AuthUser) {
    const attachment =
      authUser.role === 'super_admin'
        ? await this.attachmentRepository.findById(id)
        : await this.attachmentRepository.findByIdAndCompany(
            id,
            authUser.companyId!,
          );

    if (!attachment) {
      throw new AppError('Archivo adjunto no encontrado', 404);
    }

    return attachment;
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
      ? this.attachmentRepository.findByTicketId(ticketId)
      : this.attachmentRepository.findByTicketIdAndCompany(
          ticketId,
          authUser.companyId!,
        );
  }

  async delete(id: number, authUser: AuthUser) {
    const attachment = await this.findById(id, authUser);

    const deleted = await this.attachmentRepository.delete(id);

    await this.historyRepository.create({
      ticketId: attachment.ticketId,
      userId: authUser.id,
      action: 'ATTACHMENT_DELETED',
      oldValue: attachment.fileName,
      newValue: null,
    });

    return deleted;
  }
}