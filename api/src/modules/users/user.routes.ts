import {Router} from 'express';
import {UserController} from './user.controller';

const router = Router();
const userController = new UserController();

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
