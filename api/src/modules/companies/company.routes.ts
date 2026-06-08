
import { Router } from 'express';
import { CompanyController } from './company.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();
const companyController = new CompanyController();

router.post('/', roleMiddleware("super_admin","admin"), asyncHandler(companyController.create));
router.get('/', roleMiddleware("super_admin","admin"), asyncHandler(companyController.findAll));
router.get('/:id', roleMiddleware("super_admin","admin"), asyncHandler(companyController.findById));
router.put('/:id', roleMiddleware("super_admin","admin"), asyncHandler(companyController.update));
router.delete('/:id', roleMiddleware("super_admin","admin"), asyncHandler(companyController.delete));

export default router;