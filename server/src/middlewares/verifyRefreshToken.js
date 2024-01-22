const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

require('dotenv').config();

function verifyRefreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies[jwtConfig.refresh.name];
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    res.locals.user = user;

    next();
  } catch (error) {
    res.clearCookie(jwtConfig.refresh.name).sendStatus(403);
  }
}

module.exports = verifyRefreshToken;
