
import { Router } from 'express';
import { CompanyController } from './company.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const companyController = new CompanyController();

router.post('/', asyncHandler(companyController.create));
router.get('/', asyncHandler(companyController.findAll));
router.get('/:id', asyncHandler(companyController.findById));
router.put('/:id', asyncHandler(companyController.update));
router.delete('/:id', asyncHandler(companyController.delete));

export default router;