import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { signJwt, verifyJwt } from '../providers/jwt';
import { User } from '../models';
import { generateAccessToken } from './utils';

const hashPassword = async password =>
  new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) =>
      /* istanbul ignore next */
      err ? reject(err) : resolve(hash)
    )
  );

const comparePassword = async (password, passwordHash) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(password, passwordHash, (err, res) =>
      /* istanbul ignore next */
      err ? reject(err) : resolve(res)
    )
  );

export default {
  Query: {
    user: async (_parent, { id }, { me }) => {
      if (!me) throw new AuthenticationError('Auuthentication Required');

      if (me.user.id !== id) throw new AuthenticationError('Unauthorized');

      return User.findById(id);
    },

    loginUser: async (_parent, { username, password }) => {
      const user = await User.findOne({ email: username });

      if (!user) {
        throw new AuthenticationError();
      }

      const passwordMatch = await comparePassword(password, user.password);

      if (!passwordMatch) {
        throw new AuthenticationError();
      }

      const [token, renewToken] = await generateAccessToken(user);

      return { token, renewToken, user };
    },

    renewUser: async (_parent, { renewToken }) => {
      const { userId } = await verifyJwt(renewToken);

      const user = await User.findById(userId);

      return {
        token: await signJwt({
          user: { id: user.id, email: user.email, name: user.name },
        }),
        renewToken: await signJwt({ userId }),
        user,
      };
    },
  },

  Mutation: {
    createUser: async (_parent, { name, email, password }) => {
      const passwordHash = await hashPassword(password);
      return User.create({ name, email, password: passwordHash });
    },
  },
};
