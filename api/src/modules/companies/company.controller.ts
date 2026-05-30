import { Request, Response } from 'express';
import { CompanyService } from './company.service';

export class CompanyController {
  private companyService = new CompanyService();

  create = async (req: Request, res: Response) => {
    const company = await this.companyService.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Empresa creada correctamente',
      data: company,
    });
  };

  findAll = async (_req: Request, res: Response) => {
    const companies = await this.companyService.findAll();

    return res.json({
      success: true,
      data: companies,
    });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const company = await this.companyService.findById(Number(id));

    return res.json({
      success: true,
      data: company,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const company = await this.companyService.update(Number(id), req.body);

    return res.json({
      success: true,
      message: 'Empresa actualizada correctamente',
      data: company,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const company = await this.companyService.delete(Number(id));

    return res.json({
      success: true,
      message: 'Empresa desactivada correctamente',
      data: company,
    });
  };
}