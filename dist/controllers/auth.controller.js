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
const roleService = new role_service_1.default();
const jwtService = new jwt_service_1.default();
const userService = new user_service_1.default();
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield userService.findUserByUsername(username);
                if (user) {
                    const isPasswordMatch = user.validatePassword(password);
                    if (!isPasswordMatch) {
                        return res.status(401).send({
                            code: 401,
                            message: 'Invalid user data!',
                        });
                    }
                    else {
                        const accessToken = jwtService.generateAccessToken(user.id, user.username, user['role'].role, user.password);
                        console.log(user, 'in login');
                        const data = new userModel_1.UserModel(user.id, user.fullname, user.lastname, user.email, user.birthdate, user.gender, user.username, user.password, accessToken, user.roleId, user['role'].role);
                        return res.status(200).send({
                            code: 200,
                            success: true,
                            message: 'User logged in successfully!',
                            data,
                        });
                    }
                }
                else {
                    return res.status(404).send({
                        code: 404,
                        message: 'User not found!',
                    });
                }
            }
            catch (err) {
                return res.sendStatus(500);
            }
        });
    }
    signup(req, res) {
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
                    return res.status(400).send({
                        code: 400,
                        message: 'Invalid user data!',
                    });
                }
                const userExists = yield userService.findUserByUsername(username);
                if (userExists) {
                    return res.status(409).send({
                        code: 409,
                        message: 'User already exists!',
                    });
                }
                const userRole = yield roleService.getOneRole(role);
                if (!userRole) {
                    return res.status(404).send({
                        code: 404,
                        message: 'Role not found!!!',
                    });
                }
                console.log(userRole, 'role of user');
                if (userRole.role === constants_1.ROLE_TYPES.ADMIN && userRole.count > 1) {
                    return res.status(400).send({
                        code: 400,
                        message: "Bad request!!! Can't be more than 2 admins!",
                    });
                }
                req.body.roleId = userRole.roleId;
                const user = yield userService.createUser(req.body);
                if (user) {
                    const accessToken = jwtService.generateAccessToken(user.id, user.username, user['role'].role, user.email);
                    const data = new userModel_1.UserModel(user.id, user.fullname, user.lastname, user.email, user.birthdate, user.gender, user.username, user.password, accessToken, user.roleId, user['role'].role);
                    yield roleService.updateRoleCount(role);
                    return res.status(201).send({
                        code: 201,
                        success: true,
                        message: 'User created successfully!',
                        data,
                    });
                }
            }
            catch (err) {
                console.log(err, 'in controller');
                return res.sendStatus(500);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map