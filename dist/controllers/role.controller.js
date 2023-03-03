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
const responseModel_1 = require("../core/models/responseModel");
const roleService = new role_service_1.default();
class RoleController {
    createRole(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield roleService.createRole(req.body, next);
                return new responseModel_1.ApiResponse(201, role, 'Role created successfully!', false);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getAll(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield roleService.getAll(next);
                return new responseModel_1.ApiResponse(200, roles, 'Got all roles', false);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getRoleById(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const role = yield roleService.getRoleById(Number(id), next);
                return new responseModel_1.ApiResponse(200, role, 'Got the role', false);
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = RoleController;
//# sourceMappingURL=role.controller.js.map