import { Request, Response } from 'express';
import { CompanySubscriptionService } from './company-subscription.service';

export class CompanySubscriptionController {
  private companySubscriptionService = new CompanySubscriptionService();

  create = async (req: Request, res: Response) => {
    const subscription = await this.companySubscriptionService.create(req.body);

    return res.status(201).json({
      message: 'Suscripción de empresa creada correctamente',
      data: subscription,
    });
  };

  findAll = async (_req: Request, res: Response) => {
    const subscriptions = await this.companySubscriptionService.findAll();

    return res.json({
      data: subscriptions,
    });
  };

  findById = async (req: Request, res: Response) => {
    const subscription = await this.companySubscriptionService.findById(
      Number(req.params.id)
    );

    return res.json({
      data: subscription,
    });
  };

  findByCompanyId = async (req: Request, res: Response) => {
    const subscriptions =
      await this.companySubscriptionService.findByCompanyId(
        Number(req.params.companyId)
      );

    return res.json({
      data: subscriptions,
    });
  };

  findCurrentByCompanyId = async (req: Request, res: Response) => {
    const subscription =
      await this.companySubscriptionService.findCurrentByCompanyId(
        Number(req.params.companyId)
      );

    return res.json({
      data: subscription,
    });
  };

  update = async (req: Request, res: Response) => {
    const subscription = await this.companySubscriptionService.update(
      Number(req.params.id),
      req.body
    );

    return res.json({
      message: 'Suscripción de empresa actualizada correctamente',
      data: subscription,
    });
  };

  cancel = async (req: Request, res: Response) => {
    const subscription = await this.companySubscriptionService.cancel(
      Number(req.params.id)
    );

    return res.json({
      message: 'Suscripción de empresa cancelada correctamente',
      data: subscription,
    });
  };
}