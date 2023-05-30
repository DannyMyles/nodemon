import { Router } from 'express';
import { verifyUser } from '../core/middlewares/auth';
import permission from '../core/middlewares/permission';
import { ROLE_TYPES } from '../utils/constants';
import GameGenderController from '../controllers/gameGender.controller';

const router = Router();
const gameGenderController = new GameGenderController();

router.get(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameGenderController.getAll,
);
router.post(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameGenderController.createGameDifficulty,
);
router.get(
  '/single/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameGenderController.get,
);

router.put(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameGenderController.update,
);
router.delete(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameGenderController.delete,
);

export default router;
