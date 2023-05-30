import { Router } from 'express';
import { verifyUser } from '../core/middlewares/auth';
import permission from '../core/middlewares/permission';
import { ROLE_TYPES } from '../utils/constants';
import GameDifficultyController from '../controllers/gameDifficulty.controller';

const router = Router();
const gameDifficultyController = new GameDifficultyController();

router.get(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameDifficultyController.getAll,
);
router.post(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameDifficultyController.createGameDifficulty,
);
router.get(
  '/single/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameDifficultyController.get,
);

router.put(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameDifficultyController.update,
);
router.delete(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameDifficultyController.delete,
);

export default router;
