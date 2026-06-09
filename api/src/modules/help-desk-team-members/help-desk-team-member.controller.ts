import { Request, Response } from 'express';
import { HelpDeskTeamMemberService } from './help-desk-team-member.service';

export class HelpDeskTeamMemberController {
  private service = new HelpDeskTeamMemberService();

  create = async (req: Request, res: Response) => {
    const member = await this.service.create(req.body, req.user!);

    return res.status(201).json({
      success: true,
      message: 'Ingeniero agregado a la mesa de ayuda correctamente',
      data: member,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const members = await this.service.findAll(req.user!);

    return res.json({
      success: true,
      data: members,
    });
  };

  findById = async (req: Request, res: Response) => {
    const member = await this.service.findById(Number(req.params.id), req.user!);

    return res.json({
      success: true,
      data: member,
    });
  };

  findByTeamId = async (req: Request, res: Response) => {
    const members = await this.service.findByTeamId(
      Number(req.params.teamId),
      req.user!
    );

    return res.json({
      success: true,
      data: members,
    });
  };

  update = async (req: Request, res: Response) => {
    const member = await this.service.update(
      Number(req.params.id),
      req.body,
      req.user!
    );

    return res.json({
      success: true,
      message: 'Miembro actualizado correctamente',
      data: member,
    });
  };

  delete = async (req: Request, res: Response) => {
    const member = await this.service.delete(Number(req.params.id), req.user!);

    return res.json({
      success: true,
      message: 'Miembro desactivado correctamente',
      data: member,
    });
  };
}