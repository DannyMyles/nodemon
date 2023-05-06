"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_db_1 = require("../connect-db");
const sequelize_1 = require("sequelize");
class Image extends sequelize_1.Model {
}
Image.init({
    gameID: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    prize: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    difficulty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dateAdded: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dateUpdated: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    parentCategoryID: {
        type: sequelize_1.DataTypes.STRING,
        // allowNull: false,
    },
    paidAmount: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: connect_db_1.sequelize,
    modelName: 'images',
    freezeTableName: true,
});
// Image.belongsTo(User);
// User.hasMany(Image);
exports.default = Image;
//# sourceMappingURL=imageEntity.js.map