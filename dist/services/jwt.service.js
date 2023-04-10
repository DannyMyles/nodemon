"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JwtService {
    generateAccessToken(id, username, role, email) {
        return jsonwebtoken_1.default.sign({
            id: id,
            username: username,
            role: role,
            email: email,
        }, process.env.JWT_SECRET, {
            expiresIn: '30min',
        });
    }
    verifyToken(token, next) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            return next(err);
        }
    }
}
exports.default = JwtService;
//# sourceMappingURL=jwt.service.js.map