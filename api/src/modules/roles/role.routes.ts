import { Router } from 'express';
import { RoleController } from './role.controller';

const router = Router();
const roleController = new RoleController();

router.post('/', roleController.create);
router.get('/', roleController.findAll);
router.get('/:id', roleController.findById);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.delete);

export default router;