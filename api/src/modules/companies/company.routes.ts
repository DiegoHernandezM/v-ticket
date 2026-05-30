
import { Router } from 'express';
import { CompanyController } from './company.controller';

const router = Router();
const companyController = new CompanyController();

router.post('/', companyController.create);
router.get('/', companyController.findAll);
router.get('/:id', companyController.findById);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.delete);

export default router;