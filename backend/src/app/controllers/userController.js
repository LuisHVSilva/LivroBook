const userService = require('../services/userService');

/*
------------------------------------------------
USER
------------------------------------------------
*/
const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
};

const createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
};

/*
------------------------------------------------
USER_TYPE
------------------------------------------------
*/
const getAllUserTypes = async (req, res) => {
    const users = await userService.getAllUserTypes();
    res.status(200).json(users);
};

const createUserType = async (req, res) => {
    const newUser = await userService.createUserType(req.body);
    res.status(201).json(newUser);
};


module.exports = { getAllUsers, createUser, getAllUserTypes, createUserType };
