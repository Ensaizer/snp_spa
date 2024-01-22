const jwtConfig = {
  access: {
    name: 'accessToken',
    expiresIn: `${1000 * 5}`,
  },
  refresh: {
    name: 'refreshToken',
    expiresIn: `${1000 * 60 * 60 * 12}`,
  },
};

module.exports = jwtConfig;
