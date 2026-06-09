import { Router } from 'express';
import { TicketController } from './ticket.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";
import { companyMiddleware } from '../../middlewares/company.middleware';


const router = Router();
const ticketController = new TicketController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => ticketController.create(req, res)));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => ticketController.findAll(req, res)));
router.get('/code/:code', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => ticketController.findByCode(req, res)));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => ticketController.findById(req, res)));    
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => ticketController.update(req, res)));
router.patch('/:id/assign', roleMiddleware('super_admin', 'admin', 'ticket_manager'), companyMiddleware, asyncHandler((req, res) => ticketController.assign(req, res)));

export default router;