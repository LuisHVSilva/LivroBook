const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../../config/db');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');

const User = require('../../models/User');
const AuthService = require('./authService');
const Log = require('../../utils/log');
const MESSAGES = require('../../utils/messages');

dotenv.config({ path: './config/.env' });

const LOG = new Log();

class AccountService {
    async registerAccount(accountData, userAgent, ip) {
        const method = 'registerAccount';
        try {
            if (!accountData.password) {
                throw new Error(MESSAGES.ERRORS.PASSWORD_REQUIRED);
            }

            const t = await sequelize.transaction()

            const { hashPassword, salt } = await this.#hashPassword(accountData.password);

            accountData.password = hashPassword;
            accountData.salt = salt;

            const user = await User.create(accountData, { transaction: t });                
            const tokens = await AuthService.createSession(user, userAgent, ip, t);

            await t.commit();

            return tokens;
        } catch (error) {
            LOG.logError(method, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            throw new Error(MESSAGES.ERRORS.USER_CREATED);
        }
    }

    async authenticate(username, password, userAgent, ip) {
        const method = 'authenticate';
        try {            
            const user = await User.findOne({ where: { username } });
            if (!user) {
                throw new Error(MESSAGES.ERRORS.USER_NOT_FOUND);
            }

            if(!user.active) {
                throw new Error(MESSAGES.ERRORS.USER_INACTIVE);
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error(MESSAGES.ERRORS.PASSWORD_INCORRECT);
            }

            const userId = user.user_id;
            const userAccess = AuthService.findSession(userId, userAgent, ip);
            if (!userAccess) {
                const refreshToken = await AuthService.generateRefreshToken(user);
                const userId = user.user_id;

                await AuthService.saveRefreshToken(userId, userAgent, ip, refreshToken, null);
            } else {                
                await AuthService.updateUserSession("last_used_at", new Date(), "user_id", userId);                
            }

            const jwtSecret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET_KEY_PROD : process.env.JWT_SECRET_KEY_DEV;
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                jwtSecret,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME }
            );

            return token;
        } catch(error) {            
            const errorMessage = error.message || MESSAGES.ERRORS.INVALID_CREDENTIALS;
            LOG.logError(method, StatusCodes.INTERNAL_SERVER_ERROR, errorMessage);

            throw new Error(errorMessage);
        }
        
    }

    async #hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            return { salt: salt, hashPassword: hashPassword }
        } catch (error) {
            throw new Error(error.message);
        }
    };

}

module.exports = AccountService;