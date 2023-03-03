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
    getImages(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const images = yield imageService.getAll(next);
                return new responseModel_1.ApiResponse(200, images, 'Got all images', false);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getImageById(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const image = yield imageService.getImageById(Number(id), next);
                return new responseModel_1.ApiResponse(200, image, 'Got the image!', false);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    addUserSubmittedImage(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield imageService.createImage(req['file'], next);
                return new responseModel_1.ApiResponse(201, image, 'image uploaded successfully!', false);
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = ImageController;
//# sourceMappingURL=image.controller.js.map