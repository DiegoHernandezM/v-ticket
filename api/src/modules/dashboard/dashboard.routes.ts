import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { companyMiddleware } from '../../middlewares/company.middleware';

const router = Router();
const dashboardController = new DashboardController();

router.get(
  '/super-admin',
  roleMiddleware('super_admin'),
  asyncHandler((req, res) => dashboardController.superAdminSummary(req, res))
);

router.get(
  '/company',
  roleMiddleware('admin', 'ticket_manager', 'engineer'),
  companyMiddleware,
  asyncHandler((req, res) => dashboardController.companySummary(req, res))
);

export default router;