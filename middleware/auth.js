const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization-Flame');
  let token;
  let tokenIsValid = false;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      tokenIsValid = true;
    } catch {}
  }

  req.isAuthenticated = tokenIsValid;

  next();
};

module.exports = auth;
