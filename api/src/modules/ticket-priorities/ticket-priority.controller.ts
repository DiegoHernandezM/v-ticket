import { Request, Response } from 'express';
import { TicketPriorityService } from './ticket-priority.service';

export class TicketPriorityController {
  private service =
    new TicketPriorityService();

  create = async (
    req: Request,
    res: Response,
  ) => {
    const priority =
      await this.service.create(req.body);

    return res.status(201).json({
      success: true,
      message:
        'Prioridad creada correctamente',
      data: priority,
    });
  };

  findAll = async (
    req: Request,
    res: Response,
  ) => {
    const priorities =
      await this.service.findAll();

    return res.json({
      success: true,
      data: priorities,
    });
  };

  findById = async (
    req: Request,
    res: Response,
  ) => {
    const priority =
      await this.service.findById(
        Number(req.params.id),
      );

    return res.json({
      success: true,
      data: priority,
    });
  };

  update = async (
    req: Request,
    res: Response,
  ) => {
    const priority =
      await this.service.update(
        Number(req.params.id),
        req.body,
      );

    return res.json({
      success: true,
      message:
        'Prioridad actualizada correctamente',
      data: priority,
    });
  };

  delete = async (
    req: Request,
    res: Response,
  ) => {
    await this.service.delete(
      Number(req.params.id),
    );

    return res.json({
      success: true,
      message:
        'Prioridad eliminada correctamente',
    });
  };
}