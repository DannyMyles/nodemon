import { Router } from 'express';
// import ImageController from '../controllers/image.controller';
import upload from '../core/middlewares/upload';
import { verifyUser } from '../core/middlewares/auth';
import permission from '../core/middlewares/permission';
import { ROLE_TYPES } from '../utils/constants';

const router = Router();
// const imageController = new ImageController();

// router.get(
//   '/images',
//   permission([ROLE_TYPES.ADMIN]),
//   imageController.getImages,
// );
// router.get('/single/:id', verifyUser, imageController.getImageById);
// router.get('/user/:id', verifyUser, imageController.getImageByUserId);

// router.post(
//   '/submit/:id',
//   verifyUser,
//   upload().single('file'),
//   imageController.addUserSubmittedImage,
// );

export default router;
