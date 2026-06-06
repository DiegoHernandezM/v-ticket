import { AppError } from '../../utils/app-error';
import { TicketRepository } from '../tickets/ticket.repository';
import { TicketHistoryRepository } from '../ticket-history/ticket-history.repository';
import { TicketAttachmentRepository } from './ticket-attachment.repository';
import { CreateTicketAttachmentDTO } from './ticket-attachment.types';

export class TicketAttachmentService {
  private attachmentRepository = new TicketAttachmentRepository();
  private ticketRepository = new TicketRepository();
  private historyRepository = new TicketHistoryRepository();

  async create(data: CreateTicketAttachmentDTO) {
    const ticket = await this.ticketRepository.findById(data.ticketId);

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    const attachment = await this.attachmentRepository.create(data);

    await this.historyRepository.create({
      ticketId: data.ticketId,
      userId: ticket.createdById,
      action: 'ATTACHMENT_ADDED',
      oldValue: null,
      newValue: data.fileName,
    });

    return attachment;
  }

  async findAll() {
    return this.attachmentRepository.findAll();
  }

  async findById(id: number) {
    const attachment = await this.attachmentRepository.findById(id);

    if (!attachment) {
      throw new AppError('Archivo adjunto no encontrado', 404);
    }

    return attachment;
  }

  async findByTicketId(ticketId: number) {
    const ticket = await this.ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    return this.attachmentRepository.findByTicketId(ticketId);
  }

  async delete(id: number) {
    const attachment = await this.findById(id);

    const deleted = await this.attachmentRepository.delete(id);

    await this.historyRepository.create({
      ticketId: attachment.ticketId,
      userId: attachment.ticket.createdById,
      action: 'ATTACHMENT_DELETED',
      oldValue: attachment.fileName,
      newValue: null,
    });

    return deleted;
  }
}