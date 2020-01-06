import { signJwt } from '../providers/jwt';

// eslint-disable-next-line import/prefer-default-export
export const generateAccessToken = async ({ id, email, name }) => [
  await signJwt({ user: { id, email, name } }),
  await signJwt({ userId: id }),
];
