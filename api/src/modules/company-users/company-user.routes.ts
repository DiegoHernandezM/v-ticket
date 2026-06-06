import { Router } from 'express';
import { CompanyUserController } from './company-user.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const companyUserController = new CompanyUserController();

router.post('/', asyncHandler(companyUserController.create));
router.get('/', asyncHandler(companyUserController.findAll));
router.get('/:id', asyncHandler(companyUserController.findById));
router.put('/:id', asyncHandler(companyUserController.update));
router.delete('/:id', asyncHandler(companyUserController.delete));

export default router;