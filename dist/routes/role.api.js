"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = __importDefault(require("../controllers/role.controller"));
const auth_1 = require("../core/middlewares/auth");
const permission_1 = __importDefault(require("../core/middlewares/permission"));
const constants_1 = require("../utils/constants");
const roleController = new role_controller_1.default();
const router = (0, express_1.Router)();
router.get('/', auth_1.verifyUser, (0, permission_1.default)([constants_1.ROLE_TYPES.ADMIN]), roleController.getAll);
router.get('/:id', auth_1.verifyUser, (0, permission_1.default)([constants_1.ROLE_TYPES.ADMIN]), roleController.getRoleById);
router.post('/', auth_1.verifyUser, (0, permission_1.default)([constants_1.ROLE_TYPES.ADMIN]), roleController.createRole);
exports.default = router;
//# sourceMappingURL=role.api.js.map