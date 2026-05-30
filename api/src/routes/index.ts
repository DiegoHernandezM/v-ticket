import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/users/user.routes';
import companyRoutes from '../modules/companies/company.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/users', userRoutes);

export default router;