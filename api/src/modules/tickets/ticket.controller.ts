import { Request, Response } from 'express';
import { TicketService } from './ticket.service';

export class TicketController {
  private ticketService = new TicketService();

  async create(req: Request, res: Response) {
    const ticket = await this.ticketService.create(req.body, req.user!);

    return res.status(201).json({
      message: 'Ticket creado correctamente',
      data: ticket,
    });
  }

  async findAll(req: Request, res: Response) {
    const tickets = await this.ticketService.findAll(req.user!);

    return res.json({
      message: 'Tickets obtenidos correctamente',
      data: tickets,
    });
  }

  async findById(req: Request, res: Response) {
    const ticket = await this.ticketService.findById(
      Number(req.params.id),
      req.user!
    );

    return res.json({
      message: 'Ticket obtenido correctamente',
      data: ticket,
    });
  }

  async findByCode(req: Request, res: Response) {
    const ticket = await this.ticketService.findByCode(
      req.params.code,
      req.user!
    );

    return res.json({
      message: 'Ticket obtenido correctamente',
      data: ticket,
    });
  }

  async update(req: Request, res: Response) {
    const ticket = await this.ticketService.update(
      Number(req.params.id),
      req.body,
      req.user!
    );

    return res.json({
      message: 'Ticket actualizado correctamente',
      data: ticket,
    });
  }

  assign = async (req: Request, res: Response) => {
    const ticket = await this.ticketService.assign(
      Number(req.params.id),
      req.body,
      req.user!
    );

    return res.json({
      success: true,
      message: 'Ticket reasignado correctamente',
      data: ticket,
    });
  };
}