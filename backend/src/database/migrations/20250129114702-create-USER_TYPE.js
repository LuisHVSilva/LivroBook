'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('USER_TYPE', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },      
      description: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      createdAt: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.NOW 
      },
      updatedAt: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.NOW 
      },
      active: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: false 
      },

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('USER_TYPE');
  }
}