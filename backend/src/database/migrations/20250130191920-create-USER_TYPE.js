'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('USER_TYPE', {
      user_type_id: {
        type: DataTypes.BIGINT,        
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,        
      },      
      description: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      active: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: false 
      },
      created_at: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.NOW 
      },
      updated_at: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.NOW 
      },      
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('USER_TYPE');
  }
}