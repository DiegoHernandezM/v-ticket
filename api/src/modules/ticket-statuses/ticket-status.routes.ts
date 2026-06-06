import { Router } from 'express';
import { TicketStatusController } from './ticket-status.controller';

const router = Router();
const ticketStatusController = new TicketStatusController();

router.post('/', ticketStatusController.create);
router.get('/', ticketStatusController.findAll);
router.get('/:id', ticketStatusController.findById);
router.put('/:id', ticketStatusController.update);
router.delete('/:id', ticketStatusController.delete);

export default router;