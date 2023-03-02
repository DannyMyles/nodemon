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
const roleEntity_1 = __importDefault(require("../db/entities/roleEntity"));
class RoleService {
    createRole(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return roleEntity_1.default.create({
                    role: data.role,
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return roleEntity_1.default.findAll();
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getRoleById(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return roleEntity_1.default.findByPk(roleId);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // Getting role by role
    getOneRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return roleEntity_1.default.findOne({
                    where: { role },
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // If returns 0 then nothing is updated, else returns 1.
    updateRoleCount(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currRole = yield this.getOneRole(role);
                if (currRole) {
                    const updatedCount = yield roleEntity_1.default.update({
                        count: currRole.count + 1,
                    }, {
                        where: {
                            role: role,
                        },
                    });
                    return updatedCount[0];
                }
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = RoleService;
//# sourceMappingURL=role.service.js.map