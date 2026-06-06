import { Router } from 'express';
import { ContactController } from './contact.controller';

const router = Router();
const contactController = new ContactController();

router.post('/', contactController.create);
router.get('/', contactController.findAll);
router.get('/client/:clientId', contactController.findByClientId);
router.get('/:id', contactController.findById);
router.put('/:id', contactController.update);
router.delete('/:id', contactController.delete);

export default router;