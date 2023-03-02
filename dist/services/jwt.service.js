"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    generateAccessToken(id, username, role, email) {
        return jsonwebtoken_1.default.sign({
            id: id,
            username: username,
            role: role,
            email: email,
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.EXP_TIME,
        });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            return null;
        }
    }
}
exports.default = JwtService;
//# sourceMappingURL=jwt.service.js.map