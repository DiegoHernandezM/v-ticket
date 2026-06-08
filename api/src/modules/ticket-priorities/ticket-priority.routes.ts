import { Router } from 'express';
import { TicketPriorityController } from './ticket-priority.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

const controller =
  new TicketPriorityController();


router.post('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler((req, res) => controller.create(req, res)));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler((req, res) => controller.create(req, res)));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler((req, res) => controller.findAll(req, res)));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler((req, res) => controller.findById(req, res)));
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler((req, res) => controller.update(req, res)));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler((req, res) => controller.delete(req, res)));

export default router;