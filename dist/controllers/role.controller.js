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
const role_service_1 = __importDefault(require("../services/role.service"));
const roleService = new role_service_1.default();
class RoleController {
    createRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield roleService.createRole(req.body);
                return res.status(201).send({
                    code: 201,
                    success: true,
                    message: 'Role created successfully!',
                    data: role,
                });
            }
            catch (err) {
                return res.sendStatus(500);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield roleService.getAll();
                return res.status(200).send({
                    code: 200,
                    success: true,
                    message: 'Got all roles!',
                    data: roles,
                });
            }
            catch (err) {
                return res.status(400).send({
                    code: 400,
                    message: 'Roles not found!',
                });
            }
        });
    }
    getRoleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const role = yield roleService.getRoleById(Number(id));
                return res.status(200).send({
                    code: 200,
                    success: true,
                    message: 'Got the role!',
                    data: role,
                });
            }
            catch (err) {
                return res.status(400).send({
                    code: 400,
                    message: 'Role not found!',
                });
            }
        });
    }
}
exports.default = RoleController;
//# sourceMappingURL=role.controller.js.map