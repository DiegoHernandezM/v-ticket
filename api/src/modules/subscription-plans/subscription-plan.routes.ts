import { Router } from 'express';
import { SubscriptionPlanController } from './subscription-plan.controller';
import { asyncHandler } from '../../utils/async-handler';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';

const router = Router();

const controller = new SubscriptionPlanController();

router.use(authMiddleware);

router.get('/', asyncHandler(controller.findAll));
router.get('/active', asyncHandler(controller.findActive));
router.get('/:id', asyncHandler(controller.findById));

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

router.delete(
  '/:id',
  roleMiddleware('super_admin'),
  asyncHandler(controller.delete)
);

export default router;