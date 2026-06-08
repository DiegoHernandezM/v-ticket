import { Router } from 'express';
import { TicketHistoryController } from './ticket-history.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();
const controller = new TicketHistoryController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager" , "engineer"), asyncHandler(controller.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.findAll));
router.get('/ticket/:ticketId', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.findByTicketId));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.findById));

export default router;