'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('USER_TYPE', [
      {
        description: 'Administrador',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),        
      },
      {
        description: 'Moderador',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),        
      },
      {
        description: 'Usuario',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),        
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('USER_TYPE', null, {});
  }
};
