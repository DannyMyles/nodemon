"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_db_1 = require("../connect-db");
const sequelize_1 = require("sequelize");
const userEntity_1 = __importDefault(require("./userEntity"));
class AuthSession extends sequelize_1.Model {
}
AuthSession.init({
    authId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    loginTime: {
        type: sequelize_1.DataTypes.DATE,
    },
    logoutTime: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: connect_db_1.sequelize,
    modelName: 'auth',
    freezeTableName: true,
});
AuthSession.belongsTo(userEntity_1.default, {
    foreignKey: 'userId',
});
userEntity_1.default.hasMany(AuthSession);
exports.default = AuthSession;
//# sourceMappingURL=authEntity.js.map