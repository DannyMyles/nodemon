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
const userEntity_1 = __importDefault(require("../db/entities/userEntity"));
class UserService {
    createUser(data, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield userEntity_1.default.create({
                    roleId: data.roleId,
                    fullname: data.fullname,
                    lastname: data.lastname,
                    email: data.email,
                    birthdate: data.birthdate,
                    gender: data.gender,
                    username: data.username,
                    password: data.password,
                });
                return this.findUserByUsername(newUser.username, next);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    findUserByUsername(username, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return userEntity_1.default.findOne({
                    where: { username },
                    include: ['role'],
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    update(id, data, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userEntity_1.default.update(Object.assign({}, data), {
                    where: { id },
                });
                return userEntity_1.default.findByPk(id);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getAll(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return userEntity_1.default.findAll({
                    include: ['role'],
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    findById(id, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return userEntity_1.default.findByPk(id, {
                    include: ['role'],
                });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    delete(id, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userEntity_1.default.findByPk(id);
                yield userEntity_1.default.destroy({
                    where: {
                        id,
                    },
                });
                return user;
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map