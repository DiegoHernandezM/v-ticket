import { Router } from 'express';
import { TicketStatusController } from './ticket-status.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";
import { companyMiddleware } from "../../middlewares/company.middleware";   

const router = Router();
const ticketStatusController = new TicketStatusController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => ticketStatusController.create(req, res)));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => ticketStatusController.findAll(req, res)));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => ticketStatusController.findById(req, res)));
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => ticketStatusController.update(req, res)));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => ticketStatusController.delete(req, res)));

export default router;