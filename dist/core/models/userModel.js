"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const constants_1 = require("../../utils/constants");
class UserModel {
    constructor(id = 0, fullname = '', lastname = '', email = '', birthdate = '', gender = constants_1.GENDER_TYPES.MALE, username = '', password = '', accessToken = '', roleId = 0, role) {
        this.id = id;
        this.fullname = fullname;
        this.lastname = lastname;
        this.email = email;
        this.birthdate = birthdate;
        this.gender = gender;
        this.username = username;
        this.password = password;
        this.accessToken = accessToken;
        this.roleId = roleId;
        this.role = role;
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=userModel.js.map