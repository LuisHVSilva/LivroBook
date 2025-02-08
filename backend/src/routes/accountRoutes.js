// Imports
const express = require('express');
const Validations = require('../middlewares/validationMiddleware');
const AccountController = require('../controllers/accountController')

const accountController = new AccountController();

// Router
const router = express.Router();

// Routes
router.post('/login', Validations.accountLoginValidation(), accountController.login);
router.post('/register', Validations.accountCreateValidation(), Validations.checkUniqueUsername, accountController.register);



module.exports = router;
