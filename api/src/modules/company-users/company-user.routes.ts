import { Router } from 'express';
import { CompanyUserController } from './company-user.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();
const companyUserController = new CompanyUserController();

router.post('/', roleMiddleware("super_admin","admin"), asyncHandler(companyUserController.create));
router.get('/', roleMiddleware("super_admin","admin"), asyncHandler(companyUserController.findAll));
router.get('/:id', roleMiddleware("super_admin","admin"), asyncHandler(companyUserController.findById));
router.put('/:id', roleMiddleware("super_admin","admin"), asyncHandler(companyUserController.update));
router.delete('/:id', roleMiddleware("super_admin","admin"), asyncHandler(companyUserController.delete));

export default router;