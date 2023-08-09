const TokenService = require("../auth/TokenService");

const tokenAuthentication = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.substring(7);

    try {
      // Verify the token from the authorization header
      const driver = await TokenService.verify(token);
      // Send driver id if verification is successful
      req.authenticatedDriver = driver;
    } catch (err) {}
  }
  next();
};

module.exports = tokenAuthentication;
