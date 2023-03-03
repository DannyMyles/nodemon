"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../core/middlewares/auth");
const permission_1 = __importDefault(require("../core/middlewares/permission"));
const constants_1 = require("../utils/constants");
const router = (0, express_1.Router)();
const userController = new user_controller_1.default();
router.get('/', auth_1.verifyUser, (0, permission_1.default)([constants_1.ROLE_TYPES.ADMIN]), userController.getAll);
router.get('/:id', auth_1.verifyUser, (0, permission_1.default)([constants_1.ROLE_TYPES.ADMIN]), userController.get);
router.put('/:id', auth_1.verifyUser, (0, permission_1.default)([constants_1.ROLE_TYPES.ADMIN]), userController.update);
router.delete('/:id', auth_1.verifyUser, (0, permission_1.default)([constants_1.ROLE_TYPES.ADMIN]), userController.delete);
exports.default = router;
//# sourceMappingURL=user.api.js.map