
import { Router } from 'express';
import { CompanyController } from './company.controller';
import { asyncHandler } from '../../utils/async-handler';
import { roleMiddleware } from "../../middlewares/role.middleware";
import { companyMiddleware } from "../../middlewares/company.middleware";



const router = Router();
const companyController = new CompanyController();

router.post('/', roleMiddleware("super_admin","admin"), companyMiddleware, asyncHandler((req, res) => companyController.create(req, res)));
router.get('/', roleMiddleware("super_admin","admin"), companyMiddleware, asyncHandler((req, res) => companyController.findAll(req, res)));
router.get('/:id', roleMiddleware("super_admin","admin"), companyMiddleware, asyncHandler((req, res) => companyController.findById(req, res)));
router.put('/:id', roleMiddleware("super_admin","admin"), companyMiddleware, asyncHandler((req, res) => companyController.update(req, res)));
router.delete('/:id', roleMiddleware("super_admin","admin"), companyMiddleware, asyncHandler((req, res) => companyController.delete(req, res)));

export default router;