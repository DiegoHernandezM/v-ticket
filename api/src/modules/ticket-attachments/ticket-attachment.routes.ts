import { Router } from 'express';
import { TicketAttachmentController } from './ticket-attachment.controller';
import { asyncHandler } from '../../utils/async-handler';
import { uploadTicketFile } from '../../middlewares/upload.middleware';
import { roleMiddleware } from "../../middlewares/role.middleware";
import { companyMiddleware } from "../../middlewares/company.middleware";   

const router = Router();
const controller = new TicketAttachmentController();

router.post(
  '/upload',
  uploadTicketFile.single('file'),
  companyMiddleware,
  asyncHandler((req, res) => controller.upload(req, res)),
);

router.post('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => controller.create(req, res)));
router.get('/', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => controller.findAll(req, res)));
router.get('/ticket/:ticketId', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => controller.findByTicketId(req, res)));
router.get('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => controller.findById(req, res)));
router.delete('/:id', roleMiddleware("super_admin","admin", "ticket_manager", "engineer"), companyMiddleware, asyncHandler((req, res) => controller.delete(req, res)));

export default router;