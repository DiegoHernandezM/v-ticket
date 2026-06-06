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

const router = Router();


router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/company-users', companyUserRoutes);
router.use('/clients', clientRoutes);
router.use('/contacts', contactRoutes);
router.use('/ticket-statuses', ticketStatusRoutes);
router.use('/ticket-priorities', ticketPriorityRoutes);

export default router;