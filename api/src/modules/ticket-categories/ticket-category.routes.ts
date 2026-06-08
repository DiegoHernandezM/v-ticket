import { Router } from 'express';
import { TicketCategoryController } from './ticket-category.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();
const ticketCategoryController = new TicketCategoryController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(ticketCategoryController.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(ticketCategoryController.findAll));
router.get('/company/:companyId', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(ticketCategoryController.findByCompanyId));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(ticketCategoryController.findById));
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(ticketCategoryController.update));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(ticketCategoryController.delete));

export default router;