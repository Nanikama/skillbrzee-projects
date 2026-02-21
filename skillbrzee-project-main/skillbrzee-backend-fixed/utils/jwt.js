const jwt = require('jsonwebtoken');

exports.generateAccessToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set in environment variables.');
  return jwt.sign({ id: userId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

exports.generateRefreshToken = (userId) => {
  // Fall back to JWT_SECRET + '_refresh' if JWT_REFRESH_SECRET is not set
  const secret = process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET + '_refresh');
  return jwt.sign({ id: userId }, secret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  });
};

exports.getRefreshSecret = () =>
  process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET + '_refresh');
