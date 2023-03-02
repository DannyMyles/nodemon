"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSessionModel = void 0;
class AuthSessionModel {
    constructor(authId = 0, userId = 0, loginTime = new Date(), logoutTime = new Date()) {
        this.authId = authId;
        this.userId = userId;
        this.loginTime = loginTime;
        this.logoutTime = logoutTime;
    }
}
exports.AuthSessionModel = AuthSessionModel;
//# sourceMappingURL=authModel.js.map