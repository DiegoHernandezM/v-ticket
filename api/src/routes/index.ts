import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/users/user.routes';
import companyRoutes from '../modules/companies/company.routes';
import companyUserRoutes from '../modules/company-users/company-user.routes';
import roleRoutes from '../modules/roles/role.routes';
import clientRoutes from '../modules/clients/client.routes';
import contactRoutes from '../modules/contacts/contact.routes';
import ticketStatusRoutes from '../modules/ticket-statuses/ticket-status.routes';
import ticketPriorityRoutes from '../modules/ticket-priorities/ticket-priority.routes';
import { authMiddleware } from '../middlewares/auth.middleware';
import ticketCategoryRoutes from '../modules/ticket-categories/ticket-category.routes';

const router = Router();


router.use('/auth', authRoutes);
router.use('/companies', authMiddleware, companyRoutes);
router.use('/users', authMiddleware, userRoutes);
router.use('/roles', authMiddleware, roleRoutes);
router.use('/company-users', authMiddleware, companyUserRoutes);
router.use('/clients', authMiddleware, clientRoutes);
router.use('/contacts', authMiddleware, contactRoutes);
router.use('/ticket-statuses', authMiddleware, ticketStatusRoutes);
router.use('/ticket-priorities', authMiddleware, ticketPriorityRoutes);
router.use('/ticket-categories', authMiddleware, ticketCategoryRoutes);


export default router;