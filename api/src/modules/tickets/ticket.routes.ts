import { Router } from 'express';
import { TicketController } from './ticket.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const ticketController = new TicketController();

router.post('/', asyncHandler(ticketController.create));
router.get('/', asyncHandler(ticketController.findAll));
router.get('/code/:code', asyncHandler(ticketController.findByCode));
router.get('/:id', asyncHandler(ticketController.findById));
router.put('/:id', asyncHandler(ticketController.update));

export default router;