const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserType = sequelize.define('UserType', {    
    user_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE, 
        allowNull: false
    },
}, 
{
    tableName: 'USER_TYPE',
    timestamps: false,
}
);

UserType.associations = (models) => {
    UserType.hasMany(models.User, {foreignKey: 'user_type_id', as: 'users'});
}

module.exports = UserType;
