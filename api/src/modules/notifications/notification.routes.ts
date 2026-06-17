import { Router } from 'express';
import { NotificationController } from './notification.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { companyMiddleware } from '../../middlewares/company.middleware';

const router = Router();
const notificationController = new NotificationController();

router.get(
  '/',
  roleMiddleware('admin', 'ticket_manager', 'engineer'),
  companyMiddleware,
  asyncHandler((req, res) => notificationController.findMyNotifications(req, res))
);

router.get(
  '/unread-count',
  roleMiddleware('admin', 'ticket_manager', 'engineer'),
  companyMiddleware,
  asyncHandler((req, res) => notificationController.countUnread(req, res))
);

router.patch(
  '/read-all',
  roleMiddleware('admin', 'ticket_manager', 'engineer'),
  companyMiddleware,
  asyncHandler((req, res) => notificationController.markAllAsRead(req, res))
);

router.patch(
  '/:id/read',
  roleMiddleware('admin', 'ticket_manager', 'engineer'),
  companyMiddleware,
  asyncHandler((req, res) => notificationController.markAsRead(req, res))
);

export default router;