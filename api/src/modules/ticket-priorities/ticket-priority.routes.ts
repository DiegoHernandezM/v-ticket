import { Router } from 'express';
import { TicketPriorityController } from './ticket-priority.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

const controller =
  new TicketPriorityController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(controller.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(controller.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(controller.findAll));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(controller.findById));
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(controller.update));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(controller.delete));

export default router;