import { Router } from 'express';
import ImageController from '../controllers/image.controller';
import upload from '../core/middlewares/upload';
import { verifyUser } from '../core/middlewares/auth';

const router = Router();
const imageController = new ImageController();

router.get('/images', imageController.getImages);
router.get('/image/:id', imageController.getImageById);
router.post(
  '/submit',
  verifyUser,
  upload().single('file'),
  imageController.addUserSubmittedImage,
);

export default router;
