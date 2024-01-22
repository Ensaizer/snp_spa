const express = require('express');
const jwtConfig = require('../config/jwtConfig');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../config/cookiesConfig')
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');

const tokensRouter = express.Router();

tokensRouter.get('/refresh', verifyRefreshToken, async (req, res) => {
  const { user } = res.locals;
  const { accessToken, refreshToken } = generateTokens({ user });
  res
    .cookie(jwtConfig.refresh.name, refreshToken, cookiesConfig.refresh)
    .status(200)
    .json({ accessToken, user });
});

module.exports = tokensRouter;
