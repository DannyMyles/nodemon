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
const gameImageEntity_1 = __importDefault(require("../db/entities/gameImageEntity"));
class ImageService {
    createImage(data, userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return gameImageEntity_1.default.create({
                    image: data.originalname,
                    updatedBy: userId,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getAll(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return gameImageEntity_1.default.findAll();
            }
            catch (err) {
                return next(err);
            }
        });
    }
    // Getting image by id
    getImageById(gameID, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return gameImageEntity_1.default.findByPk(gameID);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    // Getting image by user id
    getImageByUserId(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return gameImageEntity_1.default.findAll({
                    where: {
                        updatedBy: userId,
                    },
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = ImageService;
//# sourceMappingURL=image.service.js.map