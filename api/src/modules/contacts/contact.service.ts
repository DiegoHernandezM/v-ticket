import { AppError } from '../../utils/app-error';
import { ClientRepository } from '../clients/client.repository';
import { ContactRepository } from './contact.repository';
import { CreateContactDTO, UpdateContactDTO } from './contact.types';
import { AuthUser } from '../../types/auth-user.type';

export class ContactService {
  private contactRepository = new ContactRepository();
  private clientRepository = new ClientRepository();

  async create(data: CreateContactDTO, authUser: AuthUser) {
    const client =
      authUser.role === 'super_admin'
        ? await this.clientRepository.findById(data.clientId)
        : await this.clientRepository.findByIdAndCompany(
            data.clientId,
            authUser.companyId!
          );

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    if (data.isPrimary) {
      await this.contactRepository.unsetPrimaryContacts(data.clientId);
    }

    return this.contactRepository.create(data);
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.contactRepository.findAll();
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.contactRepository.findAllByCompany(authUser.companyId);
  }

  async findById(id: number, authUser: AuthUser) {
    const contact =
      authUser.role === 'super_admin'
        ? await this.contactRepository.findById(id)
        : await this.contactRepository.findByIdAndCompany(
            id,
            authUser.companyId!
          );

    if (!contact) {
      throw new AppError('Contacto no encontrado', 404);
    }

    return contact;
  }

  async findByClientId(clientId: number, authUser: AuthUser) {
    const client =
      authUser.role === 'super_admin'
        ? await this.clientRepository.findById(clientId)
        : await this.clientRepository.findByIdAndCompany(
            clientId,
            authUser.companyId!
          );

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    return authUser.role === 'super_admin'
      ? this.contactRepository.findByClientId(clientId)
      : this.contactRepository.findByClientIdAndCompany(
          clientId,
          authUser.companyId!
        );
  }

  async update(id: number, data: UpdateContactDTO, authUser: AuthUser) {
    const currentContact = await this.findById(id, authUser);

    const clientId = data.clientId ?? currentContact.clientId;

    const client =
      authUser.role === 'super_admin'
        ? await this.clientRepository.findById(clientId)
        : await this.clientRepository.findByIdAndCompany(
            clientId,
            authUser.companyId!
          );

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    if (data.isPrimary) {
      await this.contactRepository.unsetPrimaryContacts(clientId);
    }

    return this.contactRepository.update(id, data);
  }

  async delete(id: number, authUser: AuthUser) {
    await this.findById(id, authUser);

    return this.contactRepository.delete(id);
  }
}