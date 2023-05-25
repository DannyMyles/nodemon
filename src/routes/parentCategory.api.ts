import { Router } from 'express';
import { verifyUser } from '../core/middlewares/auth';
import permission from '../core/middlewares/permission';
import upload from '../core/middlewares/upload';
import { ROLE_TYPES } from '../utils/constants';
import ParentCatgegoryController from '../controllers/parentCategory.controller';

const router = Router();
const parentCatgegoryController = new ParentCatgegoryController();

router.get(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  parentCatgegoryController.getAll,
);
router.post(
  '/:categoryName/:enabled',
  verifyUser,
  upload().single('file'),
  permission([ROLE_TYPES.ADMIN]),
  parentCatgegoryController.createParentCategory,
);
router.get(
  '/single/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  parentCatgegoryController.get,
);

router.put(
  '/:id',
  verifyUser,
  upload().single('file'),
  permission([ROLE_TYPES.ADMIN]),
  parentCatgegoryController.update,
);
router.delete(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  parentCatgegoryController.delete,
);

export default router;
