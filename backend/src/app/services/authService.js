const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const UserSession = require("../../models/UserSession");
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

class AuthService {
    static async findSession(userId, userAgent, ip) {
        const deviceId = this.#generateDeviceId(userAgent, ip);
        return await UserSession.findOne({ where: { user_id: userId, device_id: deviceId } });
    }

    static async createSession(user, userAgent, ip, transaction = null) {
        try {
            const accessToken = this.generateAccessToken(user);
            const refreshToken = this.generateRefreshToken(user);

            await this.saveRefreshToken(user.user_id, userAgent, ip, refreshToken, transaction);

            return { accessToken, refreshToken };
        } catch (error) {            
            throw new Error('Erro ao criar sessão:', error);
        }
    }

    static async updateUserSession(field, value, condition, conditionValue) {        
        await UserSession.update(
            { [field]: value },
            { where: { [condition]: conditionValue } }
        );

        if (field == "last_used_at") {
            await UserSession.update(
                { "expires_at": this.#refreshTokenExpiresDate() },
                { where: { [condition]: conditionValue } }
            );
        }
    }

    static generateAccessToken(user) {
        return jwt.sign({ id: user._id, username: user.username }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRATION });
    }

    static generateRefreshToken(user) {
        return jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRATION });
    }

    static async saveRefreshToken(userId, userAgent, ip, refreshToken, transaction = null) {
        const expiresAt = this.#refreshTokenExpiresDate();
        const deviceId = this.#generateDeviceId(userAgent, ip);

        const sessionData = { user_id: userId, refresh_token: refreshToken, expires_at: expiresAt, device_id: deviceId };
        if (transaction) {
            await UserSession.create(sessionData, { transaction: transaction });
            return true;
        }
        await UserSession.create(sessionData, { transaction: transaction });
    }

    async removeRefreshToken(refreshToken) {
        await UserSession.deleteOne({ token: refreshToken });
    }

    async verifyRefreshToken(refreshToken) {
        const tokenExists = await UserSession.findOne({ refresh_token: refreshToken });
        if (!tokenExists) throw new Error("Token inválido ou expirado");

        return jwt.verify(refreshToken, REFRESH_SECRET);
    }

    static #generateDeviceId(userAgent, ip) {
        return uuidv4(userAgent + ip);
    }

    static #refreshTokenExpiresDate() {
        const currentDate = new Date();
        const expirationString = process.env.REFRESH_TOKEN_EXPIRATION;
        const regex = /(\d+)([dhm])/;
        const matches = expirationString.match(regex);

        if (!matches) {
            throw new Error('Formato de REFRESH_TOKEN_EXPIRATION inválido');
        }

        const quantity = parseInt(matches[1], 10);
        const unit = matches[2];

        switch (unit) {
            case 'd':
                currentDate.setDate(currentDate.getDate() + quantity);
                break;
            case 'h':
                currentDate.setHours(currentDate.getHours() + quantity);
                break;
            case 'm':
                currentDate.setMinutes(currentDate.getMinutes() + quantity);
                break;
            default:
                throw new Error('Unidade de tempo inválida');
        }

        return currentDate;
    }
}


module.exports = AuthService;