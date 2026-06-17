// src/modules/company-subscriptions/company-subscription.routes.ts

import { Router } from 'express';
import { CompanySubscriptionController } from './company-subscription.controller';
import { asyncHandler } from '../../utils/async-handler';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';

const router = Router();

const controller = new CompanySubscriptionController();

router.use(authMiddleware);

router.get(
  '/',
  roleMiddleware('super_admin'),
  asyncHandler(controller.findAll)
);

router.get(
  '/company/:companyId',
  roleMiddleware('super_admin'),
  asyncHandler(controller.findByCompanyId)
);

router.get(
  '/company/:companyId/current',
  roleMiddleware('super_admin', 'admin'),
  asyncHandler(controller.findCurrentByCompanyId)
);

router.post(
  '/',
  roleMiddleware('super_admin'),
  asyncHandler(controller.create)
);

router.put(
  '/:id',
  roleMiddleware('super_admin'),
  asyncHandler(controller.update)
);

router.get(
  '/:id',
  roleMiddleware('super_admin'),
  asyncHandler(controller.findById)
);

router.patch(
  '/:id/cancel',
  roleMiddleware('super_admin'),
  asyncHandler(controller.cancel)
);

export default router;