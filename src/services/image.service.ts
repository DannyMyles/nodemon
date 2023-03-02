import Image from '../db/entities/imageEntity';
import multer from 'multer';

export default class ImageService {
    public async createImage(data: multer.Multer): Promise<Image | void> {
        try {
            return Image.create({
                type: data.mimetype,
                name: data.originalname,
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getAll(): Promise<Image[] | void> {
        try {
            return Image.findAll();
        } catch (err) {
            throw new Error(err);
        }
    }

    // Getting image by id
    public async getImageById(imageId: number): Promise<Image | void> {
        try {
            return Image.findByPk(imageId);
        } catch (err) {
            throw new Error(err);
        }
    }
}
