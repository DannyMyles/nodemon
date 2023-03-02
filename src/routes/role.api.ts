import { Router } from 'express';
import RoleController from '../controllers/role.controller';

const roleController = new RoleController();
const router = Router();

router.get('/', roleController.getAll);
router.get('/:id', roleController.getRoleById);
router.post('/', roleController.createRole);

export default router;
