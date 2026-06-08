import { Request, Response } from 'express';
import { ClientService } from './client.service';

export class ClientController {
  private clientService = new ClientService();

  async create(req: Request, res: Response) {
    const client = await this.clientService.create(req.body, req.user!);

    return res.status(201).json({
      success: true,
      message: 'Cliente creado correctamente',
      data: client,
    });
  };

  async findAll(req: Request, res: Response) {
    const clients = await this.clientService.findAll(req.user!);
    return res.json({
      success: true,
      data: clients,
    });
  };

  async findById(req: Request, res: Response) {
    const client = await this.clientService.findById(Number(req.params.id), req.user!);

    return res.json({
      success: true,
      data: client,
    });
  };

  async update(req: Request, res: Response) {
    const client = await this.clientService.update(Number(req.params.id), req.body, req.user!);

    return res.json({
      success: true,
      message: 'Cliente actualizado correctamente',
      data: client,
    });
  };

  async delete(req: Request, res: Response) {
    const client = await this.clientService.delete(Number(req.params.id), req.user!);

    return res.json({
      success: true,
      message: 'Cliente desactivado correctamente',
      data: client,
    });
  };
}