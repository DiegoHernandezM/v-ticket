import { Request, Response } from 'express';
import { TicketAttachmentService } from './ticket-attachment.service';

export class TicketAttachmentController {
  private service = new TicketAttachmentService();

  create = async (req: Request, res: Response) => {
    const attachment = await this.service.create(
      req.body,
      req.user!,
    );

    return res.status(201).json({
      success: true,
      message: 'Archivo adjunto registrado correctamente',
      data: attachment,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const attachments = await this.service.findAll(
      req.user!,
    );

    return res.json({
      success: true,
      data: attachments,
    });
  };

  findById = async (req: Request, res: Response) => {
    const attachment = await this.service.findById(
      Number(req.params.id),
      req.user!,
    );

    return res.json({
      success: true,
      data: attachment,
    });
  };

  findByTicketId = async (req: Request, res: Response) => {
    const attachments = await this.service.findByTicketId(
      Number(req.params.ticketId),
      req.user!,
    );

    return res.json({
      success: true,
      data: attachments,
    });
  };

  delete = async (req: Request, res: Response) => {
    const attachment = await this.service.delete(
      Number(req.params.id),
      req.user!,
    );

    return res.json({
      success: true,
      message: 'Archivo adjunto eliminado correctamente',
      data: attachment,
    });
  };

  upload = async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Archivo no proporcionado',
      });
    }

    const attachment = await this.service.create(
      {
        ticketId: Number(req.body.ticketId),
        fileName: file.originalname,
        fileUrl: `/uploads/tickets/${file.filename}`,
        mimeType: file.mimetype,
        size: file.size,
      },
      req.user!,
    );

    return res.status(201).json({
      success: true,
      message: 'Archivo subido correctamente',
      data: attachment,
    });
  };
}