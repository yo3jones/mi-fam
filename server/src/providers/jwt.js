import jwt from 'jsonwebtoken';

const { JWT_ACCESS_TOKEN_SECRET } = process.env;

export const signJwt = async payload =>
  jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET);

export const verifyJwt = async token =>
  jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
