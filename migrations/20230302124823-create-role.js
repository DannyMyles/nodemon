'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('role', {
      roleId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('role');
  },
};
