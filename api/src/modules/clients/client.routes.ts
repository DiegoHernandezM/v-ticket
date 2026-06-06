import { Router } from 'express';
import { ClientController } from './client.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const clientController = new ClientController();

router.post('/', asyncHandler(clientController.create));
router.get('/', asyncHandler(clientController.findAll));
router.get('/:id', asyncHandler(clientController.findById));
router.put('/:id', asyncHandler(clientController.update));
router.delete('/:id', asyncHandler(clientController.delete));

export default router;