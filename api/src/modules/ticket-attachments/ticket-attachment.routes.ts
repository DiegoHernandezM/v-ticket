import { Router } from 'express';
import { TicketAttachmentController } from './ticket-attachment.controller';
import { asyncHandler } from '../../utils/async-handler';
import { uploadTicketFile } from '../../middlewares/upload.middleware';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();
const controller = new TicketAttachmentController();

router.post(
  '/upload',
  uploadTicketFile.single('file'),
  asyncHandler(controller.upload),
);

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.create));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.findAll));
router.get('/ticket/:ticketId', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.findByTicketId));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.findById));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), asyncHandler(controller.delete));

export default router;