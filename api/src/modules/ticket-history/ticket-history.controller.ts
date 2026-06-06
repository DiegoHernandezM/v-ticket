import { Request, Response } from 'express';
import { TicketHistoryService } from './ticket-history.service';

export class TicketHistoryController {
  private service = new TicketHistoryService();

  create = async (req: Request, res: Response) => {
    const history = await this.service.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Historial creado correctamente',
      data: history,
    });
  };

  findAll = async (_req: Request, res: Response) => {
    const history = await this.service.findAll();

    return res.json({
      success: true,
      data: history,
    });
  };

  findById = async (req: Request, res: Response) => {
    const history = await this.service.findById(Number(req.params.id));

    return res.json({
      success: true,
      data: history,
    });
  };

  findByTicketId = async (req: Request, res: Response) => {
    const history = await this.service.findByTicketId(
      Number(req.params.ticketId),
    );

    return res.json({
      success: true,
      data: history,
    });
  };
}