import { AppError } from '../../utils/app-error';
import { AuthUser } from '../../types/auth-user.type';
import { getScopedCompanyId } from '../../utils/company-scope';
import { TicketStatusRepository } from './ticket-status.repository';
import {
  CreateTicketStatusDTO,
  UpdateTicketStatusDTO,
} from './ticket-status.types';

export class TicketStatusService {
  private ticketStatusRepository = new TicketStatusRepository();

  async create(
    data: CreateTicketStatusDTO,
    authUser: AuthUser,
  ) {
    const companyId = getScopedCompanyId(
      authUser,
      data.companyId,
    );

    if (!companyId) {
      throw new AppError('La empresa es requerida', 400);
    }

    const statusWithSameSlug =
      await this.ticketStatusRepository.findBySlugAndCompany(
        data.slug,
        companyId,
      );

    if (statusWithSameSlug) {
      throw new AppError(
        'Ya existe un estatus con ese slug',
        400,
      );
    }

    return this.ticketStatusRepository.create({
      ...data,
      companyId,
    });
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.ticketStatusRepository.findAll();
    }

    return this.ticketStatusRepository.findAllByCompany(
      authUser.companyId!,
    );
  }

  async findById(
    id: number,
    authUser: AuthUser,
  ) {
    const status =
      authUser.role === 'super_admin'
        ? await this.ticketStatusRepository.findById(id)
        : await this.ticketStatusRepository.findByIdAndCompany(
            id,
            authUser.companyId!,
          );

    if (!status) {
      throw new AppError(
        'Estatus no encontrado',
        404,
      );
    }

    return status;
  }

  async update(
    id: number,
    data: UpdateTicketStatusDTO,
    authUser: AuthUser,
  ) {
    const currentStatus = await this.findById(
      id,
      authUser,
    );

    const companyId =
      authUser.role === 'super_admin'
        ? currentStatus.companyId
        : authUser.companyId!;

    if (data.slug) {
      const statusWithSameSlug =
        await this.ticketStatusRepository.findBySlugAndCompany(
          data.slug,
          companyId,
        );

      if (
        statusWithSameSlug &&
        statusWithSameSlug.id !== id
      ) {
        throw new AppError(
          'Ya existe otro estatus con ese slug',
          400,
        );
      }
    }

    return this.ticketStatusRepository.update(
      id,
      data,
    );
  }

  async delete(
    id: number,
    authUser: AuthUser,
  ) {
    await this.findById(id, authUser);

    return this.ticketStatusRepository.delete(id);
  }
}