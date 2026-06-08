import { Router } from 'express';
import { ContactController } from './contact.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";
import { companyMiddleware } from "../../middlewares/company.middleware";   

const router = Router();
const contactController = new ContactController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => contactController.create(req, res)));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => contactController.findAll(req, res)));
router.get('/client/:clientId', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => contactController.findByClientId(req, res)));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => contactController.findById(req, res)));
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => contactController.update(req, res)));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => contactController.delete(req, res)));

export default router;