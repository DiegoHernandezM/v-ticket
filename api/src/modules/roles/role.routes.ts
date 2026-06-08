import { Router } from 'express';
import { RoleController } from './role.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();
const roleController = new RoleController();

router.post('/', roleMiddleware("super_admin","admin"), asyncHandler(roleController.create));
router.get('/:id', roleMiddleware("super_admin","admin"), asyncHandler(roleController.findById));
router.get('/', roleMiddleware("super_admin","admin"), asyncHandler(roleController.findAll));
router.put('/:id', roleMiddleware("super_admin","admin"), asyncHandler(roleController.update));
router.delete('/:id', roleMiddleware("super_admin","admin"), asyncHandler(roleController.delete));

export default router;