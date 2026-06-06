import { AppError } from '../../utils/app-error';
import { TicketStatusRepository } from './ticket-status.repository';
import {
  CreateTicketStatusDTO,
  UpdateTicketStatusDTO,
} from './ticket-status.types';

export class TicketStatusService {
  private ticketStatusRepository = new TicketStatusRepository();

  async create(data: CreateTicketStatusDTO) {
    const statusWithSameSlug = await this.ticketStatusRepository.findBySlug(
      data.slug,
    );

    if (statusWithSameSlug) {
      throw new AppError('Ya existe un estatus con ese slug', 400);
    }

    return this.ticketStatusRepository.create(data);
  }

  async findAll() {
    return this.ticketStatusRepository.findAll();
  }

  async findById(id: number) {
    const status = await this.ticketStatusRepository.findById(id);

    if (!status) {
      throw new AppError('Estatus no encontrado', 404);
    }

    return status;
  }

  async update(id: number, data: UpdateTicketStatusDTO) {
    await this.findById(id);

    if (data.slug) {
      const statusWithSameSlug = await this.ticketStatusRepository.findBySlug(
        data.slug,
      );

      if (statusWithSameSlug && statusWithSameSlug.id !== id) {
        throw new AppError('Ya existe otro estatus con ese slug', 400);
      }
    }

    return this.ticketStatusRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.ticketStatusRepository.delete(id);
  }
}