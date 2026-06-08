import { Request, Response } from 'express';
import { TicketCommentService } from './ticket-comment.service';

export class TicketCommentController {
  private service = new TicketCommentService();

  create = async (req: Request, res: Response) => {
    const comment = await this.service.create(
      req.body,
      req.user!,
    );

    return res.status(201).json({
      success: true,
      message: 'Comentario creado correctamente',
      data: comment,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const comments = await this.service.findAll(
      req.user!,
    );

    return res.json({
      success: true,
      data: comments,
    });
  };

  findById = async (req: Request, res: Response) => {
    const comment = await this.service.findById(
      Number(req.params.id),
      req.user!,
    );

    return res.json({
      success: true,
      data: comment,
    });
  };

  findByTicketId = async (req: Request, res: Response) => {
    const comments = await this.service.findByTicketId(
      Number(req.params.ticketId),
      req.user!,
    );

    return res.json({
      success: true,
      data: comments,
    });
  };

  update = async (req: Request, res: Response) => {
    const comment = await this.service.update(
      Number(req.params.id),
      req.body,
      req.user!,
    );

    return res.json({
      success: true,
      message: 'Comentario actualizado correctamente',
      data: comment,
    });
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(
      Number(req.params.id),
      req.user!,
    );

    return res.json({
      success: true,
      message: 'Comentario eliminado correctamente',
    });
  };
}