import { NextFunction, Request, Response } from 'express';
import ImageService from '../services/image.service';
import { ApiResponse } from '../core/models/responseModel';
const imageService = new ImageService();

export default class ImageController {
  public async getImages(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const images = await imageService.getAll(next);
      return res
        .status(200)
        .send(new ApiResponse(200, images, 'Got all images', false));
    } catch (err) {
      return next(err);
    }
  }

  public async getImageById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const image = await imageService.getImageById(Number(id), next);
      return res
        .status(200)
        .send(new ApiResponse(200, image, 'Got the image!', false));
    } catch (err) {
      return next(err);
    }
  }

  public async addUserSubmittedImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const image = await imageService.createImage(req['file'], next);
      return res
        .status(201)
        .send(
          new ApiResponse(201, image, 'image uploaded successfully!', false),
        );
    } catch (err) {
      return next(err);
    }
  }
}
