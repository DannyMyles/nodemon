"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("../controllers/image.controller"));
const upload_1 = __importDefault(require("../core/middlewares/upload"));
const auth_1 = require("../core/middlewares/auth");
const permission_1 = __importDefault(require("../core/middlewares/permission"));
const constants_1 = require("../utils/constants");
const router = (0, express_1.Router)();
const imageController = new image_controller_1.default();
router.get('/images', (0, permission_1.default)([constants_1.ROLE_TYPES.ADMIN]), imageController.getImages);
router.get('/single/:id', imageController.getImageById);
router.get('/user/:id', imageController.getImageByUserId);
router.post('/:id/submit', auth_1.verifyUser, (0, upload_1.default)().single('file'), imageController.addUserSubmittedImage);
exports.default = router;
//# sourceMappingURL=image.api.js.map