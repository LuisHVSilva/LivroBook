// Imports
const express = require('express');
const { getAllUsers, createUser, getAllUserTypes, createUserType } = require('../controllers/userController');
const { userCreateValidation } = require ('../middlewares/validations/userValidations')

// Router
const router = express.Router();

/*
------------------------------------------------
USER
------------------------------------------------
*/
router.get('/', getAllUsers);
router.post('/register', userCreateValidation, createUser);

/*
------------------------------------------------
USER_TYPE
------------------------------------------------
*/
router.get('/usertype', getAllUserTypes);
router.post('/usertype', createUserType);

module.exports = router;
