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
const user_service_1 = __importDefault(require("../services/user.service"));
const jwt_service_1 = __importDefault(require("../services/jwt.service"));
const userModel_1 = require("../core/models/userModel");
const role_service_1 = __importDefault(require("../services/role.service"));
const constants_1 = require("../utils/constants");
const responseModel_1 = require("../core/models/responseModel");
const roleService = new role_service_1.default();
const jwtService = new jwt_service_1.default();
const userService = new user_service_1.default();
class AuthController {
    login(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                if (!(username && password)) {
                    return responseModel_1.ApiResponse.generateBadRequestErrorResponse();
                }
                const user = yield userService.findUserByUsername(username, next);
                if (user) {
                    const isPasswordMatch = user.validatePassword(password);
                    if (!isPasswordMatch) {
                        return responseModel_1.ApiResponse.generateLoginInvalidErrorResponse();
                    }
                    else {
                        const accessToken = jwtService.generateAccessToken(user.id, user.username, user['role'].role, user.password);
                        const data = new userModel_1.UserModel(user.id, user.fullname, user.lastname, user.email, user.birthdate, user.gender, user.username, user.password, accessToken, user.roleId, user['role'].role);
                        return new responseModel_1.ApiResponse(200, data, 'User logged in successfully!', false);
                    }
                }
                else {
                    return responseModel_1.ApiResponse.generateNotFoundErrorResponse('User');
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
    signup(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullname, lastname, email, birthdate, gender, username, password, } = req.body;
                const role = req.body.role ? req.body.role : constants_1.ROLE_TYPES.USER;
                if (!(fullname &&
                    lastname &&
                    email &&
                    birthdate &&
                    gender &&
                    username &&
                    password)) {
                    return responseModel_1.ApiResponse.generateBadRequestErrorResponse();
                }
                const userExists = yield userService.findUserByUsername(username, next);
                if (userExists) {
                    return responseModel_1.ApiResponse.generateDuplicationErrorResponse();
                }
                const userRole = yield roleService.getOneRole(role, next);
                if (!userRole) {
                    return responseModel_1.ApiResponse.generateNotFoundErrorResponse('Role');
                }
                if (userRole.role === constants_1.ROLE_TYPES.ADMIN && userRole.count > 1) {
                    return responseModel_1.ApiResponse.generateBadRequestErrorResponse();
                }
                req.body.roleId = userRole.roleId;
                const user = yield userService.createUser(req.body, next);
                if (user) {
                    const accessToken = jwtService.generateAccessToken(user.id, user.username, user['role'].role, user.email);
                    const data = new userModel_1.UserModel(user.id, user.fullname, user.lastname, user.email, user.birthdate, user.gender, user.username, user.password, accessToken, user.roleId, user['role'].role);
                    yield roleService.incrementRoleCount(role, next);
                    return new responseModel_1.ApiResponse(201, data, 'User created successfully!', false);
                }
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map