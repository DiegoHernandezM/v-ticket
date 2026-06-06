import { Router } from 'express';
import { CompanyUserController } from './company-user.controller';

const router = Router();
const companyUserController = new CompanyUserController();

router.post('/', companyUserController.create);
router.get('/', companyUserController.findAll);
router.get('/:id', companyUserController.findById);
router.put('/:id', companyUserController.update);
router.delete('/:id', companyUserController.delete);

export default router;