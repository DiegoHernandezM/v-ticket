import { AppError } from '../../utils/app-error';
import { AuthUser } from '../../types/auth-user.type';
import { getScopedCompanyId } from '../../utils/company-scope';
import { CompanyRepository } from '../companies/company.repository';
import { TicketPriorityRepository } from './ticket-priority.repository';
import {
  CreateTicketPriorityDTO,
  UpdateTicketPriorityDTO,
} from './ticket-priority.types';

export class TicketPriorityService {
  private priorityRepository = new TicketPriorityRepository();
  private companyRepository = new CompanyRepository();

  async create(data: CreateTicketPriorityDTO, authUser: AuthUser) {
    const companyId = getScopedCompanyId(authUser, data.companyId);

    if (!companyId) {
      throw new AppError('La empresa es requerida', 400);
    }

    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    const existing = await this.priorityRepository.findByCompanyAndSlug(
      companyId,
      data.slug,
    );

    if (existing) {
      throw new AppError('Ya existe una prioridad con ese slug', 400);
    }

    return this.priorityRepository.create({
      ...data,
      companyId,
    });
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.priorityRepository.findAll();
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.priorityRepository.findAllByCompany(authUser.companyId);
  }

  async findById(id: number, authUser: AuthUser) {
    const priority =
      authUser.role === 'super_admin'
        ? await this.priorityRepository.findById(id)
        : await this.priorityRepository.findByIdAndCompany(
            id,
            authUser.companyId!,
          );

    if (!priority) {
      throw new AppError('Prioridad no encontrada', 404);
    }

    return priority;
  }

  async update(
    id: number,
    data: UpdateTicketPriorityDTO,
    authUser: AuthUser,
  ) {
    const currentPriority = await this.findById(id, authUser);

    if (data.companyId && authUser.role !== 'super_admin') {
      throw new AppError('No puedes cambiar la empresa de la prioridad', 403);
    }

    const companyId =
      authUser.role === 'super_admin'
        ? data.companyId ?? currentPriority.companyId
        : authUser.companyId!;

    if (data.companyId && authUser.role === 'super_admin') {
      const company = await this.companyRepository.findById(data.companyId);

      if (!company) {
        throw new AppError('Empresa no encontrada', 404);
      }
    }

    if (data.slug) {
      const existing = await this.priorityRepository.findByCompanyAndSlug(
        companyId,
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

  async delete(id: number, authUser: AuthUser) {
    await this.findById(id, authUser);

    return this.priorityRepository.delete(id);
  }
}