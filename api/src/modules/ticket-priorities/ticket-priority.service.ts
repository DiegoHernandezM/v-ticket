import { AppError } from '../../utils/app-error';
import { CompanyRepository } from '../companies/company.repository';
import { TicketPriorityRepository } from './ticket-priority.repository';
import {
  CreateTicketPriorityDTO,
  UpdateTicketPriorityDTO,
} from './ticket-priority.types';

export class TicketPriorityService {
  private priorityRepository =
    new TicketPriorityRepository();

  private companyRepository =
    new CompanyRepository();

  async create(data: CreateTicketPriorityDTO) {
    const company =
      await this.companyRepository.findById(
        data.companyId,
      );

    if (!company) {
      throw new AppError(
        'Empresa no encontrada',
        404,
      );
    }

    const existing =
      await this.priorityRepository.findByCompanyAndSlug(
        data.companyId,
        data.slug,
      );

    if (existing) {
      throw new AppError(
        'Ya existe una prioridad con ese slug',
        400,
      );
    }

    return this.priorityRepository.create(data);
  }

  async findAll() {
    return this.priorityRepository.findAll();
  }

  async findById(id: number) {
    const priority =
      await this.priorityRepository.findById(id);

    if (!priority) {
      throw new AppError(
        'Prioridad no encontrada',
        404,
      );
    }

    return priority;
  }

  async update(
  id: number,
  data: UpdateTicketPriorityDTO,
) {
  const currentPriority = await this.findById(id);

  if (data.slug) {
    const existing =
      await this.priorityRepository.findByCompanyAndSlug(
        currentPriority.companyId,
        data.slug,
      );

    if (existing && existing.id !== id) {
      throw new AppError(
        'Ya existe otra prioridad con ese slug para esta empresa',
        400,
      );
    }
  }

  return this.priorityRepository.update(id, data);
}

  async delete(id: number) {
    await this.findById(id);

    return this.priorityRepository.delete(id);
  }
}