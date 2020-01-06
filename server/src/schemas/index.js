import { gql } from 'apollo-server';
import userSchema from './user';
import familySchema from './family';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, familySchema];
