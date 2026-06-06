import { AppError } from '../../utils/app-error';
import { ClientRepository } from '../clients/client.repository';
import { ContactRepository } from './contact.repository';
import { CreateContactDTO, UpdateContactDTO } from './contact.types';

export class ContactService {
  private contactRepository = new ContactRepository();
  private clientRepository = new ClientRepository();

  async create(data: CreateContactDTO) {
    const client = await this.clientRepository.findById(data.clientId);

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    if (data.isPrimary) {
      await this.contactRepository.unsetPrimaryContacts(data.clientId);
    }

    return this.contactRepository.create(data);
  }

  async findAll() {
    return this.contactRepository.findAll();
  }

  async findById(id: number) {
    const contact = await this.contactRepository.findById(id);

    if (!contact) {
      throw new AppError('Contacto no encontrado', 404);
    }

    return contact;
  }

  async findByClientId(clientId: number) {
    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    return this.contactRepository.findByClientId(clientId);
  }

  async update(id: number, data: UpdateContactDTO) {
    const currentContact = await this.findById(id);

    const clientId = data.clientId ?? currentContact.clientId;

    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    if (data.isPrimary) {
      await this.contactRepository.unsetPrimaryContacts(clientId);
    }

    return this.contactRepository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.contactRepository.delete(id);
  }
}