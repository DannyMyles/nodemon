"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("../controllers/image.controller"));
const upload_1 = __importDefault(require("../core/middlewares/upload"));
const router = (0, express_1.Router)();
const imageController = new image_controller_1.default();
router.get('/images', imageController.getImages);
router.get('/image/:id', imageController.getImageById);
router.post('/submit', 
// verifyUser,
(0, upload_1.default)().single('file'), imageController.addUserSubmittedImage);
exports.default = router;
//# sourceMappingURL=image.api.js.map