import { Router } from 'express';
import RoleController from '../controllers/role.controller';
import { verifyUser } from '../core/middlewares/auth';

const roleController = new RoleController();
const router = Router();

router.get('/', verifyUser, roleController.getAll);
router.get('/:id', verifyUser, roleController.getRoleById);
router.post('/', verifyUser, roleController.createRole);

export default router;
