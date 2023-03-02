"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_db_1 = require("../connect-db");
const sequelize_1 = require("sequelize");
class Role extends sequelize_1.Model {
}
Role.init({
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    count: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
}, {
    sequelize: connect_db_1.sequelize,
    modelName: "role",
    freezeTableName: true,
});
exports.default = Role;
//# sourceMappingURL=roleEntity.js.map