import { Router } from 'express';
import { TicketCategoryController } from './ticket-category.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";
import { companyMiddleware } from "../../middlewares/company.middleware";

const router = Router();
const ticketCategoryController = new TicketCategoryController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => ticketCategoryController.create(req, res)));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => ticketCategoryController.findAll(req, res)));
router.get('/company/:companyId', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => ticketCategoryController.findByCompanyId(req, res)));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => ticketCategoryController.findById(req, res)));
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => ticketCategoryController.update(req, res)));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => ticketCategoryController.delete(req, res)));

export default router;