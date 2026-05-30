import { CompanyRepository } from './company.repository';
import { CreateCompanyDTO, UpdateCompanyDTO } from './company.types';
import { AppError } from '../../utils/app-error';

export class CompanyService {
  private companyRepository = new CompanyRepository();

  async create(data: CreateCompanyDTO) {
    const companyWithSameRfc = data.rfc
      ? await this.companyRepository.findByRfc(data.rfc)
      : null;

    if (companyWithSameRfc) {
      throw new AppError('Ya existe una empresa registrada con ese RFC', 400);
    }

    return this.companyRepository.create(data);
  }

  async findAll() {
    return this.companyRepository.findAll();
  }

  async findById(id: number) {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    return company;
  }

  async update(id: number, data: UpdateCompanyDTO) {
    await this.findById(id);

    if (data.rfc) {
      const companyWithSameRfc = await this.companyRepository.findByRfc(data.rfc);

      if (companyWithSameRfc && companyWithSameRfc.id !== id) {
        throw new AppError('Ya existe otra empresa registrada con ese RFC', 400);
      }
    }

    return this.companyRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.companyRepository.delete(id);
  }
}