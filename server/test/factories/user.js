import faker from 'faker';
import { User } from '../../src/models';

export default factory =>
  factory.define('user', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: '',
    familyIds: [],
  });
