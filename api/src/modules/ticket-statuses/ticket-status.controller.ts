import { Request, Response } from 'express';
import { TicketStatusService } from './ticket-status.service';

export class TicketStatusController {
  private ticketStatusService = new TicketStatusService();

  create = async (req: Request, res: Response) => {
    const status = await this.ticketStatusService.create(
      req.body,
      req.user!
    );

    return res.status(201).json({
      success: true,
      message: 'Estatus creado correctamente',
      data: status,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const statuses = await this.ticketStatusService.findAll(
      req.user!
    );

    return res.json({
      success: true,
      data: statuses,
    });
  };

  findById = async (req: Request, res: Response) => {
    const status = await this.ticketStatusService.findById(
      Number(req.params.id),
      req.user!
    );

    return res.json({
      success: true,
      data: status,
    });
  };

  update = async (req: Request, res: Response) => {
    const status = await this.ticketStatusService.update(
      Number(req.params.id),
      req.body,
      req.user!
    );

    return res.json({
      success: true,
      message: 'Estatus actualizado correctamente',
      data: status,
    });
  };

  delete = async (req: Request, res: Response) => {
    const status = await this.ticketStatusService.delete(
      Number(req.params.id),
      req.user!
    );

    return res.json({
      success: true,
      message: 'Estatus eliminado correctamente',
      data: status,
    });
  };
}