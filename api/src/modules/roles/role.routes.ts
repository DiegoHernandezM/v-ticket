import { Router } from 'express';
import { RoleController } from './role.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const roleController = new RoleController();

router.post('/', asyncHandler(roleController.create));
router.get('/', asyncHandler(roleController.findAll));
router.get('/:id', asyncHandler(roleController.findById));
router.put('/:id', asyncHandler(roleController.update));
router.delete('/:id', asyncHandler(roleController.delete));

export default router;