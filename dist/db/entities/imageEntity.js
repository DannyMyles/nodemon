"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_db_1 = require("../connect-db");
const sequelize_1 = require("sequelize");
const userEntity_1 = __importDefault(require("./userEntity"));
class Image extends sequelize_1.Model {
}
Image.init({
    type: {
        type: sequelize_1.DataTypes.STRING,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: connect_db_1.sequelize,
    modelName: 'image',
    freezeTableName: true,
});
Image.belongsTo(userEntity_1.default);
userEntity_1.default.hasMany(Image);
exports.default = Image;
//# sourceMappingURL=imageEntity.js.map