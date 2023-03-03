import Image from '../db/entities/imageEntity';
import multer from 'multer';
import { NextFunction } from 'express';

export default class ImageService {
  public async createImage(
    data: multer.Multer,
    next: NextFunction,
  ): Promise<Image | void> {
    try {
      return Image.create({
        type: data.mimetype,
        name: data.originalname,
      });
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(next: NextFunction): Promise<Image[] | void> {
    try {
      return Image.findAll();
    } catch (err) {
      return next(err);
    }
  }

  // Getting image by id
  public async getImageById(
    imageId: number,
    next: NextFunction,
  ): Promise<Image | void> {
    try {
      return Image.findByPk(imageId);
    } catch (err) {
      return next(err);
    }
  }
}
