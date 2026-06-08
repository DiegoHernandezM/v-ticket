import { Router } from 'express';
import { ClientController } from './client.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";


const router = Router();
const clientController = new ClientController();

router.post('/', roleMiddleware("super_admin","admin"), asyncHandler(clientController.create));
router.get('/', roleMiddleware("super_admin","admin"),asyncHandler(clientController.findAll));
router.get('/:id', roleMiddleware("super_admin","admin"), asyncHandler(clientController.findById));
router.put('/:id', roleMiddleware("super_admin","admin"), asyncHandler(clientController.update));
router.delete('/:id', roleMiddleware("super_admin","admin"), asyncHandler(clientController.delete));

export default router;