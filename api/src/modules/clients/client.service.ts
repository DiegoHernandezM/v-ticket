import { AppError } from '../../utils/app-error';
import { CompanyRepository } from '../companies/company.repository';
import { ClientRepository } from './client.repository';
import { CreateClientDTO, UpdateClientDTO } from './client.types';
import { AuthUser } from '../../types/auth-user.type';
import { getScopedCompanyId } from '../../utils/company-scope';

export class ClientService {
  private clientRepository = new ClientRepository();
  private companyRepository = new CompanyRepository();

  async create(data: CreateClientDTO, authUser: AuthUser) {
    const companyId = getScopedCompanyId(authUser, data.companyId);

    if (!companyId) {
      throw new AppError('La empresa es requerida', 400);
    }

    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    return this.clientRepository.create({
      ...data,
      companyId,
    });
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.clientRepository.findAll();
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.clientRepository.findAllByCompany(authUser.companyId);
  }

  async findById(id: number, authUser: AuthUser) {
    const client =
      authUser.role === 'super_admin'
        ? await this.clientRepository.findById(id)
        : await this.clientRepository.findByIdAndCompany(id, authUser.companyId!);

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    return client;
  }

  async update(id: number, data: UpdateClientDTO, authUser: AuthUser) {
    await this.findById(id, authUser);

    if (data.companyId && authUser.role !== 'super_admin') {
      throw new AppError('No puedes cambiar la empresa del cliente', 403);
    }

    if (data.companyId && authUser.role === 'super_admin') {
      const company = await this.companyRepository.findById(data.companyId);

      if (!company) {
        throw new AppError('Empresa no encontrada', 404);
      }
    }

    return this.clientRepository.update(id, data);
  }

  async delete(id: number, authUser: AuthUser) {
    await this.findById(id, authUser);

    return this.clientRepository.delete(id);
  }
}