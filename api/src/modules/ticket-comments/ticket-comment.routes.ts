import { Router } from 'express';
import { TicketCommentController } from './ticket-comment.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const controller = new TicketCommentController();

router.post('/', asyncHandler(controller.create));
router.get('/', asyncHandler(controller.findAll));
router.get('/ticket/:ticketId', asyncHandler(controller.findByTicketId));
router.get('/:id', asyncHandler(controller.findById));
router.put('/:id', asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));

export default router;