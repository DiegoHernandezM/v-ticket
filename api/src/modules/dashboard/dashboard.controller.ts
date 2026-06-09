import { Request, Response } from 'express';
import { DashboardService } from './dashboard.service';

export class DashboardController {
  private dashboardService = new DashboardService();

  superAdminSummary = async (req: Request, res: Response) => {
    const summary = await this.dashboardService.getSuperAdminSummary(req.user!);

    return res.json({
      success: true,
      data: summary,
    });
  };

  companySummary = async (req: Request, res: Response) => {
    const summary = await this.dashboardService.getCompanySummary(req.user!);

    return res.json({
      success: true,
      data: summary,
    });
  };
}