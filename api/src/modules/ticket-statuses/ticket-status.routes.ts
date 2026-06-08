import { Router } from 'express';
import { TicketStatusController } from './ticket-status.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();
const ticketStatusController = new TicketStatusController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(ticketStatusController.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(ticketStatusController.findAll));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(ticketStatusController.findById));
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(ticketStatusController.update));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(ticketStatusController.delete));

export default router;