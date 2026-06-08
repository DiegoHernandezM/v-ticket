import { Router } from 'express';
import { ContactController } from './contact.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";



const router = Router();
const contactController = new ContactController();

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(contactController.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(contactController.findAll));
router.get('/client/:clientId', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(contactController.findByClientId));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(contactController.findById));
router.put('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(contactController.update));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager"), asyncHandler(contactController.delete));

export default router;