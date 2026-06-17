import { Request, Response } from 'express';
import { SubscriptionPlanService } from './subscription-plan.service';

export class SubscriptionPlanController {
  private subscriptionPlanService = new SubscriptionPlanService();

  create = async (req: Request, res: Response) => {
    const plan = await this.subscriptionPlanService.create(req.body);

    return res.status(201).json({
      message: 'Plan de suscripción creado correctamente',
      data: plan,
    });
  };

  findAll = async (_req: Request, res: Response) => {
    const plans = await this.subscriptionPlanService.findAll();

    return res.json({
      data: plans,
    });
  };

  findActive = async (_req: Request, res: Response) => {
    const plans = await this.subscriptionPlanService.findActive();

    return res.json({
      data: plans,
    });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const plan = await this.subscriptionPlanService.findById(Number(id));

    return res.json({
      data: plan,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const plan = await this.subscriptionPlanService.update(
      Number(id),
      req.body
    );

    return res.json({
      message: 'Plan de suscripción actualizado correctamente',
      data: plan,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const plan = await this.subscriptionPlanService.delete(Number(id));

    return res.json({
      message: 'Plan de suscripción eliminado correctamente',
      data: plan,
    });
  };
}