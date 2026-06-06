import { Router } from 'express';
import { ClientController } from './client.controller';

const router = Router();
const clientController = new ClientController();

router.post('/', clientController.create);
router.get('/', clientController.findAll);
router.get('/:id', clientController.findById);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.delete);

export default router;