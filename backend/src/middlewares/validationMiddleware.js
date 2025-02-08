// Imports
const { body, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const UserService = require('../services/userService');
const MESSAGES = require('../utils/messages');
const Log = require('../utils/log');

// Constants
const LOG = new Log();
const MIN_NAME_SIZE = 4;
const MIN_USERNAME_SIZE = 4;
const MIN_PASSWORD_SIZE = 6;
const SENHA = "SENHA";
const UNIQUE_FIELDS = ['name', 'email', 'phone', 'username'];
const REGEX_SPECIAL_CHARACTER = /[^a-zA-Z0-9]/;
const CAPITAL_LETTER_REGEX = /[A-Z]/;


class Validations {

    static accountCreateValidation() {
        const method = 'accountCreateValidation';

        return [
            body("name").isLength({ min: MIN_NAME_SIZE }).withMessage('Nome deve ter no mínimo 4 letras'),
            body('email').isEmail().withMessage('E-mail inválido'),
            body('username').isLength({ min: MIN_USERNAME_SIZE }).withMessage("Nome do usuário deve conter no mínimo 4 letras"),
            body('password')
                .isLength({ min: MIN_PASSWORD_SIZE }).withMessage(`${SENHA} deve ter pelo menos 6 caracteres`)
                .custom((value) => this.#containsSpecialCharacter(value, SENHA)).withMessage(`${SENHA} deve conter pelo menos um carácter especial.`)
                .custom((value) => this.#containsCapitalLetter(value, SENHA)).withMessage(`${SENHA} deve conter pelo menos uma letra maiúscula.`),
            (req, res, next) => {
                const erros = validationResult(req);                
                
                if (!erros.isEmpty()) {
                    LOG.logError(method, StatusCodes.BAD_REQUEST, erros.array());
                    return res.status(StatusCodes.BAD_REQUEST).json({ erros: erros.array() });
                }
                
                LOG.logSuccess(method, StatusCodes.OK, MESSAGES.SUCCESS.ACCOUNT_VALIDATION);
                next();
            }
        ]
    }

    static accountLoginValidation() {
        const method = 'accountLoginValidation';
        return [            
            body('username').notEmpty().withMessage('Favor preencher o nome de usuário'),
            body('password').notEmpty().withMessage('Favor preencher a senha'),                
            (req, res, next) => {
                const erros = validationResult(req);
                console.log(erros)
                
                if (!erros.isEmpty()) {
                    LOG.logError(method, StatusCodes.BAD_REQUEST, erros.array());
                    return res.status(StatusCodes.BAD_REQUEST).json({ erros: erros.array() });
                }
                
                LOG.logSuccess(method, StatusCodes.OK, MESSAGES.SUCCESS.ACCOUNT_LOGIN_VALIDATION);
                next();
            }
        ]
    }

    static async checkUniqueUsername(req, res, next) {
        const method = 'checkUniqueUsername';
        const userData = req.body;                
        const userService = new UserService();
        try {
            for (const field of UNIQUE_FIELDS) {                
                const existData = await userService.getUserByValue(field, userData[field]);

                if (existData) {
                    LOG.logError(method, StatusCodes.BAD_REQUEST, MESSAGES.ERRORS.UNIQUE_FIELD(existData));
                    return res.status(StatusCodes.BAD_REQUEST).json({ erros: MESSAGES.ERRORS.UNIQUE_FIELD(existData) });
                }
            }
            
            next();
        } catch (error) {
            LOG.logError(method, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erros: 'Erro ao verificar usuário no banco de dados.' });
        }
    }

    static #containsSpecialCharacter(value, fieldName = "Campo") {
        const regex = REGEX_SPECIAL_CHARACTER;
        if (!regex.test(value)) {
            throw new Error(`${fieldName} deve conter pelo menos um caractere especial.`);
        }

        return true;
    }

    static #containsCapitalLetter(value, fieldName = "Campo") {
        const regex = CAPITAL_LETTER_REGEX;
        if (!regex.test(value)) {
            throw new Error(`${fieldName} deve conter pelo menos uma letra maiúscula.`);
        }

        return true;
    }
}

module.exports = Validations;
