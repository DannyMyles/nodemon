import Image from '../db/entities/gameImageEntity';
import multer from 'multer';
import { NextFunction } from 'express';

export default class ImageService {
  public async createImage(
    data: multer.Multer,
    userId: number,
    next: NextFunction,
  ): Promise<Image | void> {
    try {
      return Image.create({
        image: data.originalname,
        updatedBy: userId,
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
    gameID: string,
    next: NextFunction,
  ): Promise<Image | void> {
    try {
      return Image.findByPk(gameID);
    } catch (err) {
      return next(err);
    }
  }

  // Getting image by user id
  public async getImageByUserId(
    userId: number,
    next: NextFunction,
  ): Promise<Image[] | void> {
    try {
      return Image.findAll({
        where: {
          updatedBy: userId,
        },
      });
    } catch (err) {
      return next(err);
    }
  }
}
