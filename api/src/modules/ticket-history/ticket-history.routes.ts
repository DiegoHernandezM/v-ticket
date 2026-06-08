import { Router } from 'express';
import { TicketHistoryController } from './ticket-history.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";
import { companyMiddleware } from "../../middlewares/company.middleware";   

const router = Router();
const controller = new TicketHistoryController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager" , "engineer"), companyMiddleware, asyncHandler((req, res) => controller.create(req, res)));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => controller.findAll(req, res)));
router.get('/ticket/:ticketId', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => controller.findByTicketId(req, res)));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => controller.findById(req, res)));

export default router;