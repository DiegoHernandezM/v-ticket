import { AppError } from '../../utils/app-error';
import { AuthUser } from '../../types/auth-user.type';
import { getScopedCompanyId } from '../../utils/company-scope';
import { CompanyRepository } from '../companies/company.repository';
import { TicketCategoryRepository } from './ticket-category.repository';
import {
  CreateTicketCategoryDTO,
  UpdateTicketCategoryDTO,
} from './ticket-category.types';

export class TicketCategoryService {
  private categoryRepository = new TicketCategoryRepository();
  private companyRepository = new CompanyRepository();

  async create(data: CreateTicketCategoryDTO, authUser: AuthUser) {
    const companyId = getScopedCompanyId(authUser, data.companyId);

    if (!companyId) {
      throw new AppError('La empresa es requerida', 400);
    }

    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    const existing = await this.categoryRepository.findCompanyAndSlug(
      companyId,
      data.slug,
    );

    if (existing) {
      throw new AppError('Categoría ya existe', 400);
    }

    return this.categoryRepository.create({
      ...data,
      companyId,
    });
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.categoryRepository.findAll();
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.categoryRepository.findAllByCompany(authUser.companyId);
  }

  async findById(id: number, authUser: AuthUser) {
    const category =
      authUser.role === 'super_admin'
        ? await this.categoryRepository.findById(id)
        : await this.categoryRepository.findByIdAndCompany(
            id,
            authUser.companyId!,
          );

    if (!category) {
      throw new AppError('Categoría no encontrada', 404);
    }

    return category;
  }

  async findByCompanyId(companyId: number, authUser: AuthUser) {
    if (
      authUser.role !== 'super_admin' &&
      authUser.companyId !== companyId
    ) {
      throw new AppError(
        'No tienes acceso a categorías de otra empresa',
        403,
      );
    }

    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    return this.categoryRepository.findByCompanyId(companyId);
  }

  async update(
    id: number,
    data: UpdateTicketCategoryDTO,
    authUser: AuthUser,
  ) {
    const currentCategory = await this.findById(id, authUser);

    if (data.companyId && authUser.role !== 'super_admin') {
      throw new AppError('No puedes cambiar la empresa de la categoría', 403);
    }

    const companyId =
      authUser.role === 'super_admin'
        ? data.companyId ?? currentCategory.companyId
        : authUser.companyId!;

    if (data.companyId && authUser.role === 'super_admin') {
      const company = await this.companyRepository.findById(data.companyId);

      if (!company) {
        throw new AppError('Empresa no encontrada', 404);
      }
    }

    if (data.slug) {
      const existing = await this.categoryRepository.findCompanyAndSlug(
        companyId,
        data.slug,
      );

      if (existing && existing.id !== id) {
        throw new AppError(
          'Ya existe otra categoría con ese slug para esta empresa',
          400,
        );
      }
    }

    return this.categoryRepository.update(id, data);
  }

  async delete(id: number, authUser: AuthUser) {
    await this.findById(id, authUser);

    return this.categoryRepository.delete(id);
  }
}