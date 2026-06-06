import { Request, Response } from 'express';
import { RoleService } from './role.service';

export class RoleController {
  private roleService = new RoleService();

  create = async (req: Request, res: Response) => {
    const role = await this.roleService.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Rol creado correctamente',
      data: role,
    });
  };

  findAll = async (_req: Request, res: Response) => {
    const roles = await this.roleService.findAll();

    return res.json({
      success: true,
      data: roles,
    });
  };

  findById = async (req: Request, res: Response) => {
    const role = await this.roleService.findById(Number(req.params.id));

    return res.json({
      success: true,
      data: role,
    });
  };

  update = async (req: Request, res: Response) => {
    const role = await this.roleService.update(Number(req.params.id), req.body);

    return res.json({
      success: true,
      message: 'Rol actualizado correctamente',
      data: role,
    });
  };

  delete = async (req: Request, res: Response) => {
    const role = await this.roleService.delete(Number(req.params.id));

    return res.json({
      success: true,
      message: 'Rol eliminado correctamente',
      data: role,
    });
  };
}