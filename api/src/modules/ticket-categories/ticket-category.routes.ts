import { Router } from 'express';
import { TicketCategoryController } from './ticket-category.controller';

const router = Router();
const ticketCategoryController = new TicketCategoryController();

router.post('/', ticketCategoryController.create);
router.get('/', ticketCategoryController.findAll);
router.get('/company/:companyId', ticketCategoryController.findByCompanyId);
router.get('/:id', ticketCategoryController.findById);
router.put('/:id', ticketCategoryController.update);
router.delete('/:id', ticketCategoryController.delete);

export default router;