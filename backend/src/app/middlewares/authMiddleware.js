const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const MESSAGES = require('../utils/messages');
const Log = require('../utils/log');

const LOG = new Log();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  const method = 'authenticateToken';

  if (!token) {
    LOG.logError(method, StatusCodes.BAD_REQUEST, MESSAGES.ERRORS.REQUIRED_FIELD("token"));
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: MESSAGES.ERRORS.UNAUTHORIZED });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      LOG.logError(method, StatusCodes.BAD_REQUEST, INVALID_TOKEN);
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: MESSAGES.ERRORS.UNAUTHORIZED });
    }

    req.user = user;
    next();
  });
}
module.exports = { authenticateToken };
