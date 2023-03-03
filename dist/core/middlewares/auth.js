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
exports.verifyUser = void 0;
const jwt_service_1 = __importDefault(require("../../services/jwt.service"));
const responseModel_1 = require("../models/responseModel");
const jwtService = new jwt_service_1.default();
function verifyUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.header('authorization');
            if (!authHeader) {
                return responseModel_1.ApiResponse.generateBearerInvalidErrorResponse();
            }
            const bearer = authHeader.split(' ');
            if (bearer[0].toLowerCase() !== 'bearer' ||
                typeof bearer[1] === 'undefined') {
                return responseModel_1.ApiResponse.generateBearerInvalidErrorResponse();
            }
            const accessToken = bearer[1];
            if (!accessToken) {
                return responseModel_1.ApiResponse.generateNotAuthorizedErrorResponse();
            }
            const user = jwtService.verifyToken(accessToken, next);
            if (!user) {
                return responseModel_1.ApiResponse.generateNotAuthorizedErrorResponse();
            }
            res.locals.user = user;
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
}
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth.js.map