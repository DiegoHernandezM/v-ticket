import { Request, Response } from 'express';
import { TicketHistoryService } from './ticket-history.service';

export class TicketHistoryController {
  private service = new TicketHistoryService();

  create = async (req: Request, res: Response) => {
    const history = await this.service.create(
      req.body,
      req.user!,
    );

    return res.status(201).json({
      success: true,
      message: 'Historial creado correctamente',
      data: history,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const history = await this.service.findAll(
      req.user!,
    );

    return res.json({
      success: true,
      data: history,
    });
  };

  findById = async (req: Request, res: Response) => {
    const history = await this.service.findById(
      Number(req.params.id),
      req.user!,
    );

    return res.json({
      success: true,
      data: history,
    });
  };

  findByTicketId = async (req: Request, res: Response) => {
    const history = await this.service.findByTicketId(
      Number(req.params.ticketId),
      req.user!,
    );

    return res.json({
      success: true,
      data: history,
    });
  };
}