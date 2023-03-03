import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { verifyUser } from '../core/middlewares/auth';
import permission from '../core/middlewares/permission';
import { ROLE_TYPES } from '../utils/constants';

const router = Router();
const userController = new UserController();

router.get(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  userController.getAll,
);
router.get(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  userController.get,
);

router.put(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  userController.update,
);
router.delete(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  userController.delete,
);

export default router;
