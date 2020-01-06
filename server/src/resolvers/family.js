import { AuthenticationError } from 'apollo-server';
import { Family, User } from '../models';

const checkFamilyAccess = (
  { user: { id: userId } },
  { _id: familyId, userIds }
) => {
  const hasAccess = userIds.includes(userId);

  if (!hasAccess)
    throw new AuthenticationError(
      `User does not have access to family with id ${familyId}`
    );
};

export default {
  Query: {
    family: async (_parent, { id }, { me }) => {
      if (!me) throw new AuthenticationError('Authentication required');

      const family = await Family.findById(id);

      checkFamilyAccess(me, family);

      return family;
    },
  },
  Mutation: {
    createFamily: async (_parent, { family }, { me }) => {
      if (!me) throw new AuthenticationError('Authentication required');

      const {
        user: { id: userId },
      } = me;
      return Family.create({ ...family, userIds: [userId] });
    },
  },
  Family: {
    users: async ({ userIds }) => {
      return User.find({ _id: userIds });
    },
  },
};
