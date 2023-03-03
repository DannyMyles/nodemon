'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('role', [
      {
        roleId: 1,
        role: 'admin',
        count: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        role: 'user',
        count: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('role', null, {});
  },
};
