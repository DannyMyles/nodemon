"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_db_1 = require("../connect-db");
const sequelize_1 = require("sequelize");
const crypto = __importStar(require("crypto"));
const roleEntity_1 = __importDefault(require("./roleEntity"));
// import Role from "./roleEntity";
// import Auth from "./authEntity"
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    birthdate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM('male', 'female'),
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        set(pass) {
            const hash = crypto
                .pbkdf2Sync(pass, process.env.SALT, 1000, 64, 'sha512')
                .toString('hex');
            this.setDataValue('password', hash);
        },
    },
}, {
    sequelize: connect_db_1.sequelize,
    modelName: "user",
    freezeTableName: true,
});
roleEntity_1.default.hasMany(User, {
    foreignKey: "roleId"
});
User.belongsTo(roleEntity_1.default, {
    foreignKey: "roleId"
});
User.prototype.validatePassword = function (enteredPassword) {
    const newHash = crypto
        .pbkdf2Sync(enteredPassword, process.env.SALT, 1000, 64, 'sha512')
        .toString('hex');
    return newHash === this.password;
};
exports.default = User;
//# sourceMappingURL=userEntity.js.map