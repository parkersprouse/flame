const jwt = require('jsonwebtoken');

const signToken = (expiresIn) => {
  const token = jwt.sign({ app: 'flame' }, process.env.JWT_SECRET, { expiresIn });
  return token;
};

module.exports = signToken;
