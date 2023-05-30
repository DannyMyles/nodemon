import { Router } from 'express';
import { verifyUser } from '../core/middlewares/auth';
import permission from '../core/middlewares/permission';
import { ROLE_TYPES } from '../utils/constants';
import GameAgeController from '../controllers/gameAgeBracket.controller';

const router = Router();
const gameAgeController = new GameAgeController();

router.get(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameAgeController.getAll,
);
router.post(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameAgeController.createGameDifficulty,
);
router.get(
  '/single/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameAgeController.get,
);

router.put(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameAgeController.update,
);
router.delete(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameAgeController.delete,
);

export default router;
