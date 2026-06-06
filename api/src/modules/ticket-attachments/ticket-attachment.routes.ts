import { Router } from 'express';
import { TicketAttachmentController } from './ticket-attachment.controller';
import { asyncHandler } from '../../utils/async-handler';
import { uploadTicketFile } from '../../middlewares/upload.middleware';

const router = Router();
const controller = new TicketAttachmentController();

router.post(
  '/upload',
  uploadTicketFile.single('file'),
  asyncHandler(controller.upload),
);

router.post('/', asyncHandler(controller.create));
router.get('/', asyncHandler(controller.findAll));
router.get('/ticket/:ticketId', asyncHandler(controller.findByTicketId));
router.get('/:id', asyncHandler(controller.findById));
router.delete('/:id', asyncHandler(controller.delete));

export default router;