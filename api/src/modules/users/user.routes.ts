import {Router} from 'express';
import {UserController} from './user.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();
const userController = new UserController();

router.post('/', roleMiddleware("super_admin","admin"), asyncHandler(userController.create));
router.get('/', roleMiddleware("super_admin","admin"), asyncHandler(userController.findAll));
router.get('/:id', roleMiddleware("super_admin","admin"), asyncHandler(userController.create));
router.get('/', roleMiddleware("super_admin","admin"), asyncHandler(userController.findAll));
router.get('/:id', roleMiddleware("super_admin","admin"), asyncHandler(userController.findById));
router.put('/:id', roleMiddleware("super_admin","admin"), asyncHandler(userController.findById));
router.put('/:id', roleMiddleware("super_admin","admin"), asyncHandler(userController.update));
router.delete('/:id', roleMiddleware("super_admin","admin"), asyncHandler(userController.delete));

export default router;
