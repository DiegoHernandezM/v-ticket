import { AppError } from '../../utils/app-error';
import { AuthUser } from '../../types/auth-user.type';
import { CompanyRepository } from '../companies/company.repository';
import { HelpDeskTeamRepository } from './help-desk-team.repository';
import {
  CreateHelpDeskTeamDTO,
  UpdateHelpDeskTeamDTO,
} from './help-desk-team.types';

export class HelpDeskTeamService {
  private helpDeskTeamRepository = new HelpDeskTeamRepository();
  private companyRepository = new CompanyRepository();

  async create(data: CreateHelpDeskTeamDTO, authUser: AuthUser) {
    const companyId =
      authUser.role === 'super_admin'
        ? data.companyId
        : authUser.companyId;

    if (!companyId) {
      throw new AppError('La empresa es obligatoria', 400);
    }

    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    const exists = await this.helpDeskTeamRepository.findByCompanyAndName(
      companyId,
      data.name
    );

    if (exists) {
      throw new AppError('Ya existe una mesa de ayuda con ese nombre', 409);
    }

    return this.helpDeskTeamRepository.create({
      companyId,
      name: data.name,
      isActive: data.isActive,
    });
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.helpDeskTeamRepository.findAll();
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.helpDeskTeamRepository.findAllByCompany(authUser.companyId);
  }

  async findById(id: number, authUser: AuthUser) {
    const team =
      authUser.role === 'super_admin'
        ? await this.helpDeskTeamRepository.findById(id)
        : await this.helpDeskTeamRepository.findByIdAndCompany(
            id,
            authUser.companyId!
          );

    if (!team) {
      throw new AppError('Mesa de ayuda no encontrada', 404);
    }

    return team;
  }

  async update(id: number, data: UpdateHelpDeskTeamDTO, authUser: AuthUser) {
    const currentTeam = await this.findById(id, authUser);

    const companyId =
      authUser.role === 'super_admin'
        ? data.companyId ?? currentTeam.companyId
        : currentTeam.companyId;

    if (authUser.role !== 'super_admin' && data.companyId) {
      throw new AppError('No puedes cambiar la empresa de la mesa de ayuda', 403);
    }

    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    if (data.name) {
      const exists = await this.helpDeskTeamRepository.findByCompanyAndName(
        companyId,
        data.name
      );

      if (exists && exists.id !== id) {
        throw new AppError('Ya existe una mesa de ayuda con ese nombre', 409);
      }
    }

    return this.helpDeskTeamRepository.update(id, {
      companyId,
      name: data.name,
      isActive: data.isActive,
    });
  }

  async delete(id: number, authUser: AuthUser) {
    await this.findById(id, authUser);

    return this.helpDeskTeamRepository.delete(id);
  }
}