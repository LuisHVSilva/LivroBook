// Imports
const User = require('../models/User');

class UserService {
    getAllUsers = async () => {
        return await User.findAll(); // ORM (Sequelize) ou query SQL direta
    };

    async getUserByValue(field, value) {
        return await User.findOne({ where: { [field]: value } });
    }

    createUser = async (userData) => {
        return await User.create(userData);
    };
}



module.exports = UserService;
