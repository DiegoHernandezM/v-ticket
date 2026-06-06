import { Router } from 'express';
import { TicketPriorityController } from './ticket-priority.controller';

const router = Router();

const controller =
  new TicketPriorityController();

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;