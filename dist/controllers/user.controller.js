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
const responseModel_1 = require("../core/models/responseModel");
const userModel_1 = require("../core/models/userModel");
const role_service_1 = __importDefault(require("../services/role.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
const helpers_1 = require("../utils/helpers");
const userService = new user_service_1.default();
const roleService = new role_service_1.default();
class UserController {
    getAll(_req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getAll(next);
                if (users && users.length) {
                    const data = users.map((user) => new userModel_1.UserModel(user.id, user.fullname, user.lastname, user.email, user.birthdate, user.gender, user.username, '', '', 0, user['role']));
                    return new responseModel_1.ApiResponse(200, data, 'Got all users.', false);
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
    update(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const { user } = req.body;
                if (!(id &&
                    (0, helpers_1.isSubarray)(Object.keys(userModel_1.UserModel), Object.keys(user)) &&
                    Object.keys(user).length)) {
                    return responseModel_1.ApiResponse.generateBadRequestErrorResponse();
                }
                const isUser = yield userService.findById(id, next);
                if (!isUser) {
                    return responseModel_1.ApiResponse.generateNotFoundErrorResponse('User');
                }
                const data = yield userService.update(id, user, next);
                return new responseModel_1.ApiResponse(200, data, 'User updated successfully', false);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (!id) {
                    return responseModel_1.ApiResponse.generateBadRequestErrorResponse();
                }
                const isUser = yield userService.findById(id, next);
                if (!isUser) {
                    return responseModel_1.ApiResponse.generateNotFoundErrorResponse('User');
                }
                yield roleService.decrementRoleCount(isUser['role'], next);
                const deletedUser = yield userService.delete(id, next);
                return new responseModel_1.ApiResponse(200, deletedUser, 'User deleted successfully', false);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    get(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (!id) {
                    return responseModel_1.ApiResponse.generateBadRequestErrorResponse();
                }
                const user = yield userService.findById(id, next);
                if (!user) {
                    return responseModel_1.ApiResponse.generateNotFoundErrorResponse('User');
                }
                return new responseModel_1.ApiResponse(200, user, 'Got user', false);
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map