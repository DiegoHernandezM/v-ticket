import { Request, Response } from 'express';
import { CompanyUserService } from './company-user.service';

export class CompanyUserController {
  private companyUserService = new CompanyUserService();

  create = async (req: Request, res: Response) => {
    const companyUser = await this.companyUserService.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Usuario asignado correctamente a la empresa',
      data: companyUser,
    });
  };

  findAll = async (_req: Request, res: Response) => {
    const companyUsers = await this.companyUserService.findAll();

    return res.json({
      success: true,
      data: companyUsers,
    });
  };

  findById = async (req: Request, res: Response) => {
    const companyUser = await this.companyUserService.findById(Number(req.params.id));

    return res.json({
      success: true,
      data: companyUser,
    });
  };

  update = async (req: Request, res: Response) => {
    const companyUser = await this.companyUserService.update(
      Number(req.params.id),
      req.body,
    );

    return res.json({
      success: true,
      message: 'Asignación actualizada correctamente',
      data: companyUser,
    });
  };

  delete = async (req: Request, res: Response) => {
    const companyUser = await this.companyUserService.delete(Number(req.params.id));

    return res.json({
      success: true,
      message: 'Asignación desactivada correctamente',
      data: companyUser,
    });
  };
}