import { Request, Response } from 'express';
import { ContactService } from './contact.service';

export class ContactController {
  private contactService = new ContactService();

  create = async (req: Request, res: Response) => {
    const contact = await this.contactService.create(
      req.body,
      req.user!
    );

    return res.status(201).json({
      success: true,
      message: 'Contacto creado correctamente',
      data: contact,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const contacts = await this.contactService.findAll(req.user!);

    return res.json({
      success: true,
      data: contacts,
    });
  };

  findById = async (req: Request, res: Response) => {
    const contact = await this.contactService.findById(
      Number(req.params.id),
      req.user!
    );

    return res.json({
      success: true,
      data: contact,
    });
  };

  findByClientId = async (req: Request, res: Response) => {
    const contacts = await this.contactService.findByClientId(
      Number(req.params.clientId),
      req.user!
    );

    return res.json({
      success: true,
      data: contacts,
    });
  };

  update = async (req: Request, res: Response) => {
    const contact = await this.contactService.update(
      Number(req.params.id),
      req.body,
      req.user!
    );

    return res.json({
      success: true,
      message: 'Contacto actualizado correctamente',
      data: contact,
    });
  };

  delete = async (req: Request, res: Response) => {
    const contact = await this.contactService.delete(
      Number(req.params.id),
      req.user!
    );

    return res.json({
      success: true,
      message: 'Contacto desactivado correctamente',
      data: contact,
    });
  };
}