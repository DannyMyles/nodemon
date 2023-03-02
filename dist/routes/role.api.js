"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = __importDefault(require("../controllers/role.controller"));
const roleController = new role_controller_1.default();
const router = (0, express_1.Router)();
router.get('/', roleController.getAll);
router.get('/:id', roleController.getRoleById);
router.post('/', roleController.createRole);
exports.default = router;
//# sourceMappingURL=role.api.js.map