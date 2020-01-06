import faker from 'faker';
import { User, Family } from '../../src/models';

export default factory =>
  factory.define(
    'family',
    Family,
    {
      name: faker.name.lastName(),
      display: faker.name.lastName(),
    },
    {
      preCreate: async attrs => {
        const { userIds } = attrs;
        if (userIds) return attrs;

        const user = attrs.user || {};
        const { id: userId } = await factory.create('user', user);

        return { ...attrs, userIds: [userId] };
      },
      postCreate: async ({ userIds }, family) => {
        if (userIds) return family;

        const {
          _id,
          userIds: [userId],
        } = family;

        User.update({ _id: userId }, { familyIds: [_id] });

        return family;
      },
    }
  );
