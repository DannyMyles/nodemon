import Image from '../db/entities/gameImageEntity';
import multer from 'multer';
import { NextFunction } from 'express';
import { gameImageModel } from '../core/models/gameImageModel';

export default class ImageService {
  public async createImage(
    image: multer.Multer,
    userId: number,
    next: NextFunction,
  ): Promise<Image | void> {
    // console.log('Data', image);
    try {
      return Image.create({
        image: image.originalname,
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

  // update image
  public async update(
    gameID: string,
    data: Partial<gameImageModel>,
    next: NextFunction,
  ): Promise<Image | void> {
    // console.log('data', data);
    // console.log('gameID', gameID);
    try {
      await Image.update({ ...data }, { where: { gameID } });
      return Image.findByPk(gameID);
    } catch (err) {
      return next(err);
    }
  }
}
