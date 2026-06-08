import { Router } from 'express';
import { TicketCommentController } from './ticket-comment.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();
const controller = new TicketCommentController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager" , "engineer"), asyncHandler(controller.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.findAll));
router.get('/ticket/:ticketId', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.findByTicketId));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.findById));
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.update));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(controller.delete));

export default router;