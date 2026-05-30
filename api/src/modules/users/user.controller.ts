import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private userService = new UserService();

  create = async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Usuario creado correctamente',
      data: user,
    });
  };

  findAll = async (_req: Request, res: Response) => {
    const users = await this.userService.findAll();

    return res.json({
      success: true,
      data: users,
    });
  };

  findById = async (req: Request, res: Response) => {
    const user = await this.userService.findById(Number(req.params.id));

    return res.json({
      success: true,
      data: user,
    });
  };

  update = async (req: Request, res: Response) => {
    const user = await this.userService.update(Number(req.params.id), req.body);

    return res.json({
      success: true,
      message: 'Usuario actualizado correctamente',
      data: user,
    });
  };

  delete = async (req: Request, res: Response) => {
    const user = await this.userService.delete(Number(req.params.id));

    return res.json({
      success: true,
      message: 'Usuario desactivado correctamente',
      data: user,
    });
  };
}