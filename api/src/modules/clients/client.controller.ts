import { Request, Response } from 'express';
import { ClientService } from './client.service';

export class ClientController {
  private clientService = new ClientService();

  create = async (req: Request, res: Response) => {
    const client = await this.clientService.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Cliente creado correctamente',
      data: client,
    });
  };

  findAll = async (_req: Request, res: Response) => {
    const clients = await this.clientService.findAll();

    return res.json({
      success: true,
      data: clients,
    });
  };

  findById = async (req: Request, res: Response) => {
    const client = await this.clientService.findById(Number(req.params.id));

    return res.json({
      success: true,
      data: client,
    });
  };

  update = async (req: Request, res: Response) => {
    const client = await this.clientService.update(Number(req.params.id), req.body);

    return res.json({
      success: true,
      message: 'Cliente actualizado correctamente',
      data: client,
    });
  };

  delete = async (req: Request, res: Response) => {
    const client = await this.clientService.delete(Number(req.params.id));

    return res.json({
      success: true,
      message: 'Cliente desactivado correctamente',
      data: client,
    });
  };
}