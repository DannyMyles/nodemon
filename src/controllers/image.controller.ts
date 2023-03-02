import { Request, Response } from 'express';
import ImageService from '../services/image.service';
const imageService = new ImageService();

export default class ImageController {
  public async getImages(req: Request, res: Response) {
    try {
      const images = await imageService.getAll();
      return res.status(200).send({
        code: 200,
        success: true,
        message: 'Got all images!',
        data: images,
      });
    } catch (err) {
      return res.status(400).send({
        code: 400,
        message: 'Images not found!',
      });
    }
  }

  public async getImageById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const image = await imageService.getImageById(Number(id));
      return res.status(200).send({
        code: 200,
        success: true,
        message: 'Got the image!',
        data: image,
      });
    } catch (err) {
      return res.status(400).send({
        code: 400,
        message: 'Image not found!',
      });
    }
  }

  public async addUserSubmittedImage(req: Request, res: Response) {
    try {
      const image = await imageService.createImage(req['file']);
      return res.status(201).send({
        code: 201,
        success: true,
        message: 'Image created successfully!',
        data: image,
      });
    } catch (err) {
      return res.sendStatus(500);
    }
  }
}
