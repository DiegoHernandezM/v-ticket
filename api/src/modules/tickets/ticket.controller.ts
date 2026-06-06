import { Request, Response } from 'express';
import { TicketService } from './ticket.service';

export class TicketController {
  private ticketService = new TicketService();

  create = async (req: Request, res: Response) => {
    const ticket = await this.ticketService.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Ticket creado correctamente',
      data: ticket,
    });
  };

  findAll = async (_req: Request, res: Response) => {
    const tickets = await this.ticketService.findAll();

    return res.json({
      success: true,
      data: tickets,
    });
  };

  findById = async (req: Request, res: Response) => {
    const ticket = await this.ticketService.findById(Number(req.params.id));

    return res.json({
      success: true,
      data: ticket,
    });
  };

  findByCode = async (req: Request, res: Response) => {
    const ticket = await this.ticketService.findByCode(req.params.code);

    return res.json({
      success: true,
      data: ticket,
    });
  };

  update = async (req: Request, res: Response) => {
    const ticket = await this.ticketService.update(
      Number(req.params.id),
      req.body,
    );

    return res.json({
      success: true,
      message: 'Ticket actualizado correctamente',
      data: ticket,
    });
  };
}