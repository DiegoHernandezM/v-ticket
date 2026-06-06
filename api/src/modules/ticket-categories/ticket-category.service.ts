import { AppError } from '../../utils/app-error';
import { CompanyRepository } from '../companies/company.repository';
import { TicketCategoryRepository } from './ticket-category.repository';
import { CreateTicketCategoryDTO, UpdateTicketCategoryDTO } from './ticket-category.types';

export class TicketCategoryService {
  private categoryRepository =  new TicketCategoryRepository();
  private companyRepository =  new CompanyRepository();

  async create(data: CreateTicketCategoryDTO) {
    const company = await this.companyRepository.findById(data.companyId);
    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }
    const existing = await this.categoryRepository.findCompanyAndSlug(data.companyId, data.slug);
    if (existing) {
      throw new AppError('Categoría ya existe', 400);
    }
    return this.categoryRepository.create(data);
  }

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new AppError('Categoría no encontrada', 404);
    }
    return category;
  }

  async findByCompanyId(companyId: number) {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    return this.categoryRepository.findByCompanyId(companyId);
  }

  async update(id: number, data: UpdateTicketCategoryDTO) {
    const currentCategory = await this.findById(id);
    if (data.slug) {
      const existing = await this.categoryRepository.findCompanyAndSlug(
        currentCategory.companyId,
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

  async delete(id: number) {
    await this.findById(id);
    return this.categoryRepository.delete(id);
  }
}
