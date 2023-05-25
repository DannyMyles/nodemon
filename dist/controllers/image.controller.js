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
const image_service_1 = __importDefault(require("../services/image.service"));
const responseModel_1 = require("../core/models/responseModel");
const imageService = new image_service_1.default();
class ImageController {
    getImages(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const images = yield imageService.getAll(next);
                return res
                    .status(200)
                    .send(new responseModel_1.ApiResponse(200, images, 'Got all images', false));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getImageById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const image = yield imageService.getImageById(id, next);
                return res
                    .status(200)
                    .send(new responseModel_1.ApiResponse(200, image, 'Got the image!', false));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getImageByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const images = yield imageService.getImageByUserId(Number(id), next);
                return res
                    .status(200)
                    .send(new responseModel_1.ApiResponse(200, images, 'Images retrieved successfully', false));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    addUserSubmittedImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('File', req['file']);
            try {
                const userId = parseInt(req.params.id);
                // console.log('User ID', userId);
                // Get user data from res.locals
                const user = res.locals.user;
                // console.log('Request', res.locals.user);
                // Check if the user exists
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Check if the image belongs to the user
                if (userId !== user.id) {
                    return res.status(403).json({ message: 'Forbidden' });
                }
                const image = yield imageService.createImage(req['file'], userId, next);
                return res
                    .status(201)
                    .send(new responseModel_1.ApiResponse(201, image, 'image uploaded successfully!', false));
            }
            catch (err) {
                return next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return res
                        .status(400)
                        .send(responseModel_1.ApiResponse.generateBadRequestErrorResponse());
                }
                const data = yield imageService.update(id, req.body, next);
                return res
                    .status(200)
                    .json({ message: 'Image updated successfully', data });
                // .send(new ApiResponse(200, data, 'User updated successfully', false));
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = ImageController;
//# sourceMappingURL=image.controller.js.map