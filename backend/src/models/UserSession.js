const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserSession = sequelize.define('UserSession', {
    user_session_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_used_at: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Date.now()
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    },
},
    {
        tableName: 'USER_SESSION',
        timestamps: false,
    }
);


UserSession.associations = (models) => {
    UserSession.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
}


module.exports = UserSession;
