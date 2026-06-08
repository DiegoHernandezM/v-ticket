import { Router } from 'express';
import { ClientController } from './client.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";
import { companyMiddleware } from "../../middlewares/company.middleware";

const router = Router();
const clientController = new ClientController();

router.post('/', roleMiddleware("super_admin", "admin", "ticket_manager"), companyMiddleware, asyncHandler((req, res) => clientController.create(req, res)));
router.get('/', roleMiddleware("super_admin", "admin", "ticket_manager", "engineer"),  companyMiddleware, asyncHandler((req, res) => clientController.findAll(req, res)));
router.get('/:id', roleMiddleware("super_admin", "admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => clientController.findById(req, res)));
router.put('/:id', roleMiddleware("super_admin", "admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => clientController.update(req, res)));
router.delete('/:id', roleMiddleware("super_admin","admin"), companyMiddleware, asyncHandler((req, res) => clientController.delete(req, res)));

export default router;