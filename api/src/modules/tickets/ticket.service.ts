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
import { AuthUser } from '../../types/auth-user.type';
import { TicketHistoryRepository } from '../ticket-history/ticket-history.repository';

export class TicketService {
  private ticketRepository = new TicketRepository();
  private companyRepository = new CompanyRepository();
  private clientRepository = new ClientRepository();
  private contactRepository = new ContactRepository();
  private userRepository = new UserRepository();
  private statusRepository = new TicketStatusRepository();
  private categoryRepository = new TicketCategoryRepository();
  private priorityRepository = new TicketPriorityRepository();
  private historyRepository = new TicketHistoryRepository();

  async create(data: CreateTicketDTO, authUser: AuthUser) {
    const companyId =
      authUser.role === 'super_admin'
        ? data.companyId
        : authUser.companyId;

    if (!companyId) {
      throw new AppError('No se pudo determinar la empresa del ticket', 400);
    }

    const payload = {
      ...data,
      companyId,
      createdById: authUser.id,
    };

    await this.validateCreateData(payload);

    const code = await this.generateTicketCode();

    const ticket = await this.ticketRepository.create({
      ...payload,
      code,
    });

    await this.historyRepository.create({
      ticketId: ticket.id,
      userId: authUser.id,
      action: 'TICKET_CREATED',
      oldValue: '',
      newValue: `Ticket creado con código ${ticket.code}`,
    });

    return ticket;
  }

  async findAll(authUser: AuthUser) {
    if (authUser.role === 'super_admin') {
      return this.ticketRepository.findAll();
    }

    if (!authUser.companyId) {
      throw new AppError('El usuario no pertenece a ninguna empresa', 403);
    }

    return this.ticketRepository.findAllByCompany(authUser.companyId);
  }

  async findById(id: number, authUser: AuthUser) {
    const ticket =
      authUser.role === 'super_admin'
        ? await this.ticketRepository.findById(id)
        : await this.ticketRepository.findByIdAndCompany(id, authUser.companyId!);

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    return ticket;
  }

  async findByCode(code: string, authUser: AuthUser) {
    const ticket =
      authUser.role === 'super_admin'
        ? await this.ticketRepository.findByCode(code)
        : await this.ticketRepository.findByCodeAndCompany(code, authUser.companyId!);

    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    return ticket;
  }

  async update(id: number, data: UpdateTicketDTO, authUser: AuthUser) {
    const currentTicket = await this.findById(id, authUser);

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

    const updatedTicket = await this.ticketRepository.update(id, data);

    await this.registerUpdateHistory(currentTicket, updatedTicket, data);

    return updatedTicket;
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

  private async registerUpdateHistory(
    currentTicket: any,
    updatedTicket: any,
    data: UpdateTicketDTO,
  ) {
    const userId = updatedTicket.assignedToId ?? updatedTicket.createdById;

    if (data.statusId && currentTicket.statusId !== data.statusId) {
      await this.historyRepository.create({
        ticketId: currentTicket.id,
        userId,
        action: 'STATUS_CHANGED',
        oldValue: currentTicket.status?.name ?? String(currentTicket.statusId),
        newValue: updatedTicket.status?.name ?? String(data.statusId),
      });
    }

    if (data.priorityId && currentTicket.priorityId !== data.priorityId) {
      await this.historyRepository.create({
        ticketId: currentTicket.id,
        userId,
        action: 'PRIORITY_CHANGED',
        oldValue: currentTicket.priority?.name ?? String(currentTicket.priorityId),
        newValue: updatedTicket.priority?.name ?? String(data.priorityId),
      });
    }

    if (data.categoryId && currentTicket.categoryId !== data.categoryId) {
      await this.historyRepository.create({
        ticketId: currentTicket.id,
        userId,
        action: 'CATEGORY_CHANGED',
        oldValue: currentTicket.category?.name ?? String(currentTicket.categoryId),
        newValue: updatedTicket.category?.name ?? String(data.categoryId),
      });
    }

    if (
      data.assignedToId &&
      currentTicket.assignedToId !== data.assignedToId
    ) {
      await this.historyRepository.create({
        ticketId: currentTicket.id,
        userId,
        action: 'ASSIGNED_CHANGED',
        oldValue: currentTicket.assignedTo?.name ?? 'Sin asignar',
        newValue: updatedTicket.assignedTo?.name ?? String(data.assignedToId),
      });
    }

    if (data.title && currentTicket.title !== data.title) {
      await this.historyRepository.create({
        ticketId: currentTicket.id,
        userId,
        action: 'TITLE_CHANGED',
        oldValue: currentTicket.title,
        newValue: data.title,
      });
    }

    if (data.description && currentTicket.description !== data.description) {
      await this.historyRepository.create({
        ticketId: currentTicket.id,
        userId,
        action: 'DESCRIPTION_CHANGED',
        oldValue: currentTicket.description,
        newValue: data.description,
      });
    }

    if (data.closedAt && !currentTicket.closedAt) {
      await this.historyRepository.create({
        ticketId: currentTicket.id,
        userId,
        action: 'TICKET_CLOSED',
        oldValue: '',
        newValue: 'Ticket cerrado',
      });
    }
  }
}