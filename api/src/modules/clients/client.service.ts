import { AppError } from '../../utils/app-error';
import { CompanyRepository } from '../companies/company.repository';
import { ClientRepository } from './client.repository';
import { CreateClientDTO, UpdateClientDTO } from './client.types';

export class ClientService {
  private clientRepository = new ClientRepository();
  private companyRepository = new CompanyRepository();

  async create(data: CreateClientDTO) {
    const company = await this.companyRepository.findById(data.companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    return this.clientRepository.create(data);
  }

  async findAll() {
    return this.clientRepository.findAll();
  }

  async findById(id: number) {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    return client;
  }

  async update(id: number, data: UpdateClientDTO) {
    await this.findById(id);

    if (data.companyId) {
      const company = await this.companyRepository.findById(data.companyId);

      if (!company) {
        throw new AppError('Empresa no encontrada', 404);
      }
    }

    return this.clientRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.clientRepository.delete(id);
  }
}