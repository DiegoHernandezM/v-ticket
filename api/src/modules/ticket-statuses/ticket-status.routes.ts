import { Router } from 'express';
import { TicketStatusController } from './ticket-status.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const ticketStatusController = new TicketStatusController();

router.post('/', asyncHandler(ticketStatusController.create));
router.get('/', asyncHandler(ticketStatusController.findAll));
router.get('/:id', asyncHandler(ticketStatusController.findById));
router.put('/:id', asyncHandler(ticketStatusController.update));
router.delete('/:id', asyncHandler(ticketStatusController.delete));

export default router;