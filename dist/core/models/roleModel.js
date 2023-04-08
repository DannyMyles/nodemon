"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const constants_1 = require("../../utils/constants");
class RoleModel {
    constructor(roleId = '', role = constants_1.ROLE_TYPES.USER, count = 0, createdAt = new Date(), updatedAt = new Date()) {
        this.roleId = roleId;
        this.role = role;
        this.count = count;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.RoleModel = RoleModel;
//# sourceMappingURL=roleModel.js.map