import { Router } from 'express';
import { TicketHistoryController } from './ticket-history.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const controller = new TicketHistoryController();

router.post('/', asyncHandler(controller.create));
router.get('/', asyncHandler(controller.findAll));
router.get('/ticket/:ticketId', asyncHandler(controller.findByTicketId));
router.get('/:id', asyncHandler(controller.findById));

export default router;