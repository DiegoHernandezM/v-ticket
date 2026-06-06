import { Router } from 'express';
import { ContactController } from './contact.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const contactController = new ContactController();

router.post('/', asyncHandler(contactController.create));
router.get('/', asyncHandler(contactController.findAll));
router.get('/client/:clientId', asyncHandler(contactController.findByClientId));
router.get('/:id', asyncHandler(contactController.findById));
router.put('/:id', asyncHandler(contactController.update));
router.delete('/:id', asyncHandler(contactController.delete));

export default router;