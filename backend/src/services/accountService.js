const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');
const dotenv = require('dotenv');

const User = require('../models/User');
const UserSession = require('../models/UserSession');
const AuthService = require('../services/authService');

dotenv.config({ path: './config/.env' });

class AccountService {
    async registerAccount(accountData, userAgent, ip) {
        try {
            if (!accountData.password) {
                throw new Error('Senha é obrigatória');
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
            console.error('Erro ao registrar conta:', error);
            throw new Error('Erro ao registrar conta');
        }
    }

    async authenticate(username, password, userAgent, ip) {
        try {            
            const user = await User.findOne({ where: { username } });
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            if(!user.active) {
                throw new Error('Usuário inativo. Favor verificar usuário')
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Senha incorreta');
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
            const errorMessage = error.message || 'Falha ao validar usuário';
            throw new Error(errorMessage);
        }
        
    }

    async #hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            return { salt: salt, hashPassword: hashPassword }
        } catch (error) {
            throw new Error("Erro ao criptografar senha.");
        }
    };

}

module.exports = AccountService;