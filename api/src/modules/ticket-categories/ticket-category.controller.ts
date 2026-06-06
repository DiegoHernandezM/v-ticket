import { Request, Response } from 'express';
import { TicketCategoryService } from './ticket-category.service';

export class TicketCategoryController {
  private categoryService = new TicketCategoryService();

  create = async (req: Request, res: Response) => {
    const category = await this.categoryService.create(req.body);
    return res.status(201).json({
        success: true,
        message: 'Categoría creada con éxito',
        data: category,
    });
  };
  
  findAll = async (_req: Request, res: Response) => {
    const categories = await this.categoryService.findAll();

    return res.json({
      success: true,
      data: categories,
    });
  };

  findByCompanyId = async (req: Request, res: Response) => {
    const categories = await this.categoryService.findByCompanyId(
      Number(req.params.companyId),
    );

    return res.json({
      success: true,
      data: categories,
    });
  };

  findById = async (req: Request, res: Response) => {
    const category = await this.categoryService.findById(Number(req.params.id));

    return res.json({
      success: true,
      data: category,
    });
  };

  update = async (req: Request, res: Response) => {
    const category = await this.categoryService.update(
      Number(req.params.id),
      req.body,
    );

    return res.json({
      success: true,
      message: 'Categoría actualizada correctamente',
      data: category,
    });
  };

  delete = async (req: Request, res: Response) => {
    const category = await this.categoryService.delete(Number(req.params.id));

    return res.json({
      success: true,
      message: 'Categoría desactivada correctamente',
      data: category,
    });
  };
}
