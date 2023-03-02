"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const upload_1 = __importDefault(require("../core/middlewares/upload"));
const router = (0, express_1.Router)();
const userController = new user_controller_1.default();
// router.get('/images', userController.getImages);
// router.get('/image/:id', userController.getImageById);
router.post('/submit', upload_1.default, userController.addUserSubmittedImage);
exports.default = router;
//# sourceMappingURL=user.api.js.map