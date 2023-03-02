"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Request, Response } from 'express';
const user_service_1 = __importDefault(require("../services/user.service"));
const userService = new user_service_1.default();
const image_service_1 = __importDefault(require("../services/image.service"));
const imageService = new image_service_1.default();
class UserController {
    // public async getImages(req: Request, res: Response) {
    //     try {
    //         const images = await imageService.getAll();
    //
    //         return res.status(200).send({
    //             code: 200,
    //             success: true,
    //             message: 'Got all images!',
    //             data: images,
    //         });
    //     } catch (e) {
    //         return res.status(400).send({
    //             code: 400,
    //             message: 'Images not found!',
    //         });
    //     }
    // }
    //
    // public async getImageById(req: Request, res: Response) {
    //     try {
    //         const { id } = req.params;
    //
    //         const image = await imageService.getImageById(Number(id));
    //
    //         return res.status(200).send({
    //             code: 200,
    //             success: true,
    //             message: 'Got the image!',
    //             data: image,
    //         });
    //     } catch (e) {
    //         return res.status(400).send({
    //             code: 400,
    //             message: 'Image not found!',
    //         });
    //     }
    // }
    addUserSubmittedImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield imageService.createImage(req.file);
                return res.status(201).send({
                    code: 201,
                    success: true,
                    message: 'Image created successfully!',
                    data: image,
                });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map