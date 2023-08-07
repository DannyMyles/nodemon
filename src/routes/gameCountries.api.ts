import { Router } from 'express';
import { verifyUser } from '../core/middlewares/auth';
import permission from '../core/middlewares/permission';
import { ROLE_TYPES } from '../utils/constants';
import GameCountriesController from '../controllers/gameCountries.controller';

const router = Router();
const gameCountriesController = new GameCountriesController();

router.get(
  '/',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameCountriesController.getAll,
);
router.post(
  '/add_new',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameCountriesController.createGameCountry,
);
router.get(
  '/single/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameCountriesController.get,
);

router.put(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameCountriesController.update,
);
router.delete(
  '/:id',
  verifyUser,
  permission([ROLE_TYPES.ADMIN]),
  gameCountriesController.delete,
);

export default router;
