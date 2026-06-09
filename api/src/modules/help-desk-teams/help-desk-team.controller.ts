import { Request, Response } from 'express';
import { HelpDeskTeamService } from './help-desk-team.service';

export class HelpDeskTeamController {
  private helpDeskTeamService = new HelpDeskTeamService();

  create = async (req: Request, res: Response) => {
    const team = await this.helpDeskTeamService.create(req.body, req.user!);

    return res.status(201).json({
      success: true,
      message: 'Mesa de ayuda creada correctamente',
      data: team,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const teams = await this.helpDeskTeamService.findAll(req.user!);

    return res.json({
      success: true,
      data: teams,
    });
  };

  findById = async (req: Request, res: Response) => {
    const team = await this.helpDeskTeamService.findById(
      Number(req.params.id),
      req.user!
    );

    return res.json({
      success: true,
      data: team,
    });
  };

  update = async (req: Request, res: Response) => {
    const team = await this.helpDeskTeamService.update(
      Number(req.params.id),
      req.body,
      req.user!
    );

    return res.json({
      success: true,
      message: 'Mesa de ayuda actualizada correctamente',
      data: team,
    });
  };

  delete = async (req: Request, res: Response) => {
    const team = await this.helpDeskTeamService.delete(
      Number(req.params.id),
      req.user!
    );

    return res.json({
      success: true,
      message: 'Mesa de ayuda desactivada correctamente',
      data: team,
    });
  };
}