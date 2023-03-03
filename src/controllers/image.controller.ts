import { NextFunction, Request, Response } from 'express';
import ImageService from '../services/image.service';
import { ApiResponse } from '../core/models/responseModel';
const imageService = new ImageService();

export default class ImageController {
  public async getImages(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ApiResponse | void> {
    try {
      const images = await imageService.getAll(next);
      return new ApiResponse(200, images, 'Got all images', false);
    } catch (err) {
      return next(err);
    }
  }

  public async getImageById(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ApiResponse | void> {
    try {
      const { id } = req.params;
      const image = await imageService.getImageById(Number(id), next);
      return new ApiResponse(200, image, 'Got the image!', false);
    } catch (err) {
      return next(err);
    }
  }

  public async addUserSubmittedImage(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ApiResponse | void> {
    try {
      const image = await imageService.createImage(req['file'], next);
      return new ApiResponse(201, image, 'image uploaded successfully!', false);
    } catch (err) {
      return next(err);
    }
  }
}
