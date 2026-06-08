import { Router } from 'express';
import { TicketController } from './ticket.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();
const ticketController = new TicketController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(ticketController.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(ticketController.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(ticketController.findAll));
router.get('/code/:code', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(ticketController.findByCode));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(ticketController.findById));
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(ticketController.update));


export default router;