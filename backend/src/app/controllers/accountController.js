const { StatusCodes } = require('http-status-codes');

const AccountService = require('../services/accountService');
const Log = require('../utils/log');

const LOG = new Log();
const MESSAGES = require('../utils/messages');

class AccountController {
    async register(req, res) {
        try {
            const method = "Register";
            const body = req.body;
            const userAgent = req.headers['user-agent'];
            const ip = req.ip;

            const { accessToken, refreshToken } = await new AccountService().registerAccount(body, userAgent, ip)
            
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
            res.status(StatusCodes.CREATED).json({ accessToken, message: MESSAGES.SUCCESS.USER_CREATED });

            LOG.logSuccess(method, StatusCodes.CREATED, MESSAGES.SUCCESS.USER_CREATED);

        } catch (error) {
            LOG.logError(method, StatusCodes.BAD_REQUEST, error.message);
            res.status(StatusCodes.BAD_REQUEST).json({ error: MESSAGES.ERRORS.INVALID_CREDENTIALS });
        }
    }

    async login(req, res) {
        const method = 'login';
        try {            
            const { username, password } = req.body;
            const userAgent = req.headers['user-agent'];
            const ip = req.ip;

            const token = await new AccountService().authenticate(username, password, userAgent, ip);            

            res.status(200).json({ token });
            LOG.logSuccess(method, StatusCodes.OK, MESSAGES.SUCCESS.LOGIN_SUCCESS);
        } catch (error) {                    
            const errorMessage = error.message || 'Credenciais inválidas';            
            LOG.logError(method, StatusCodes.UNAUTHORIZED, error.message);
            res.status(StatusCodes.UNAUTHORIZED).json({ error: errorMessage });
        }
    }
}

module.exports = AccountController;