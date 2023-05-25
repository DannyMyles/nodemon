import { Router } from 'express';
import RoleController from '../controllers/role.controller';
import { verifyUser } from '../core/middlewares/auth';
import permission from '../core/middlewares/permission';
import { ROLE_TYPES } from '../utils/constants';

const roleController = new RoleController();
const router = Router();

router.get(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  roleController.getAll,
);
router.get(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  roleController.getRoleById,
);
router.post(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  roleController.createRole,
);

export default router;
