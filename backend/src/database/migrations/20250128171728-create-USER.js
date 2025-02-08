'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('USER', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      chagedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      userType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'USER_TYPE',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('USER');
  }
};