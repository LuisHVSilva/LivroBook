const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
    'USER', {
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    phone: {
        type: DataTypes.BIGINT,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salt: {
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
        defaultValue: Date.now()
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    },

},
    {
        tableName: 'USER',
        timestamps: false,
    }
);

User.associations = (models) => {
    User.belongsTo(models.UserType, { foreignKey: 'user_type_id', as: 'type' })
}

User.associations = (models) => {    
    User.hasMany(models.UserSessions, { foreignKey: 'user_id', as: 'session' });
};

module.exports = User;
