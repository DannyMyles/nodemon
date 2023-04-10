import { Router } from 'express';
import RoleController from '../controllers/role.controller';
import { verifyUser } from '../core/middlewares/auth';
import permission from '../core/middlewares/permission';
import { ROLE_TYPES } from '../utils/constants';

const roleController = new RoleController();
const router = Router();

router.get(
  '/',
  permission([ROLE_TYPES.ADMIN]),
  verifyUser,
  roleController.getAll,
);
router.get(
  '/:id',
  permission([ROLE_TYPES.ADMIN]),
  verifyUser,
  roleController.getRoleById,
);
router.post(
  '/',
  // permission([ROLE_TYPES.ADMIN]),
  // verifyUser,
  roleController.createRole,
);

export default router;
