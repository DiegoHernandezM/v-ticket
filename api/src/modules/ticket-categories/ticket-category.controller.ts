import { Request, Response } from 'express';
import { TicketCategoryService } from './ticket-category.service';

export class TicketCategoryController {
  private categoryService = new TicketCategoryService();

  create = async (req: Request, res: Response) => {
    const category = await this.categoryService.create(
      req.body,
      req.user!
    );

    return res.status(201).json({
      success: true,
      message: 'Categoría creada con éxito',
      data: category,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const categories = await this.categoryService.findAll(req.user!);

    return res.json({
      success: true,
      data: categories,
    });
  };

  findByCompanyId = async (req: Request, res: Response) => {
    const categories = await this.categoryService.findByCompanyId(
      Number(req.params.companyId),
      req.user!
    );

    return res.json({
      success: true,
      data: categories,
    });
  };

  findById = async (req: Request, res: Response) => {
    const category = await this.categoryService.findById(
      Number(req.params.id),
      req.user!
    );

    return res.json({
      success: true,
      data: category,
    });
  };

  update = async (req: Request, res: Response) => {
    const category = await this.categoryService.update(
      Number(req.params.id),
      req.body,
      req.user!
    );

    return res.json({
      success: true,
      message: 'Categoría actualizada correctamente',
      data: category,
    });
  };

  delete = async (req: Request, res: Response) => {
    const category = await this.categoryService.delete(
      Number(req.params.id),
      req.user!
    );

    return res.json({
      success: true,
      message: 'Categoría desactivada correctamente',
      data: category,
    });
  };
}