import { AppError } from '../../utils/app-error';
import { CompanyRepository } from '../companies/company.repository';
import { ClientRepository } from '../clients/client.repository';
import { ContactRepository } from '../contacts/contact.repository';
import { UserRepository } from '../users/user.repository';
import { TicketCategoryRepository } from '../ticket-categories/ticket-category.repository';
import { TicketPriorityRepository } from '../ticket-priorities/ticket-priority.repository';
import { TicketStatusRepository } from '../ticket-statuses/ticket-status.repository';
import { TicketRepository } from './ticket.repository';
import { CreateTicketDTO, UpdateTicketDTO } from './ticket.types';

export class TicketService {
  private ticketRepository = new TicketRepository();
  private companyRepository = new CompanyRepository();
  private clientRepository = new ClientRepository();
  private contactRepository = new ContactRepository();
  private userRepository = new UserRepository();
  private statusRepository = new TicketStatusRepository();
  private categoryRepository = new TicketCategoryRepository();
  private priorityRepository = new TicketPriorityRepository();

  async create(data: CreateTicketDTO) {
    await this.validateCreateData(data);

    const code = await this.generateTicketCode();

    return this.ticketRepository.create({
      ...data,
      code,
    });
  }

  async findAll() {
    return this.ticketRepository.findAll();
  }

  async findById(id: number) {
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    return ticket;
  }

  async findByCode(code: string) {
    const ticket = await this.ticketRepository.findByCode(code);

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    return ticket;
  }

  async update(id: number, data: UpdateTicketDTO) {
    const currentTicket = await this.findById(id);

    if (data.clientId) {
      const client = await this.clientRepository.findById(data.clientId);

      if (!client) {
        throw new AppError('Cliente no encontrado', 404);
      }

      if (client.companyId !== currentTicket.companyId) {
        throw new AppError('El cliente no pertenece a la empresa del ticket', 400);
      }
    }

    if (data.contactId) {
      const contact = await this.contactRepository.findById(data.contactId);

      if (!contact) {
        throw new AppError('Contacto no encontrado', 404);
      }
    }

    if (data.statusId) {
      const status = await this.statusRepository.findById(data.statusId);

      if (!status) {
        throw new AppError('Estatus no encontrado', 404);
      }
    }

    if (data.categoryId) {
      const category = await this.categoryRepository.findById(data.categoryId);

      if (!category) {
        throw new AppError('Categoría no encontrada', 404);
      }

      if (category.companyId !== currentTicket.companyId) {
        throw new AppError('La categoría no pertenece a la empresa del ticket', 400);
      }
    }

    if (data.priorityId) {
      const priority = await this.priorityRepository.findById(data.priorityId);

      if (!priority) {
        throw new AppError('Prioridad no encontrada', 404);
      }

      if (priority.companyId !== currentTicket.companyId) {
        throw new AppError('La prioridad no pertenece a la empresa del ticket', 400);
      }
    }

    if (data.assignedToId) {
      const assignedUser = await this.userRepository.findById(data.assignedToId);

      if (!assignedUser) {
        throw new AppError('Usuario asignado no encontrado', 404);
      }
    }

    return this.ticketRepository.update(id, data);
  }

  private async validateCreateData(data: CreateTicketDTO) {
    const company = await this.companyRepository.findById(data.companyId);

    if (!company) {
      throw new AppError('Empresa no encontrada', 404);
    }

    const client = await this.clientRepository.findById(data.clientId);

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    if (client.companyId !== data.companyId) {
      throw new AppError('El cliente no pertenece a la empresa seleccionada', 400);
    }

    if (data.contactId) {
      const contact = await this.contactRepository.findById(data.contactId);

      if (!contact) {
        throw new AppError('Contacto no encontrado', 404);
      }

      if (contact.clientId !== data.clientId) {
        throw new AppError('El contacto no pertenece al cliente seleccionado', 400);
      }
    }

    const status = await this.statusRepository.findById(data.statusId);

    if (!status) {
      throw new AppError('Estatus no encontrado', 404);
    }

    if (data.categoryId) {
      const category = await this.categoryRepository.findById(data.categoryId);

      if (!category) {
        throw new AppError('Categoría no encontrada', 404);
      }

      if (category.companyId !== data.companyId) {
        throw new AppError('La categoría no pertenece a la empresa seleccionada', 400);
      }
    }

    if (data.priorityId) {
      const priority = await this.priorityRepository.findById(data.priorityId);

      if (!priority) {
        throw new AppError('Prioridad no encontrada', 404);
      }

      if (priority.companyId !== data.companyId) {
        throw new AppError('La prioridad no pertenece a la empresa seleccionada', 400);
      }
    }

    const createdBy = await this.userRepository.findById(data.createdById);

    if (!createdBy) {
      throw new AppError('Usuario creador no encontrado', 404);
    }

    if (data.assignedToId) {
      const assignedTo = await this.userRepository.findById(data.assignedToId);

      if (!assignedTo) {
        throw new AppError('Usuario asignado no encontrado', 404);
      }
    }
  }

  private async generateTicketCode() {
    const lastTicket = await this.ticketRepository.findLastTicket();

    const nextId = lastTicket ? lastTicket.id + 1 : 1;

    return `VT-${String(nextId).padStart(6, '0')}`;
  }
}