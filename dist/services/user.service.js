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
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data, 'in service');
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
                return this.findUserByUsername(newUser.username);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return userEntity_1.default.findOne({
                    where: { username },
                    include: ["role"],
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map