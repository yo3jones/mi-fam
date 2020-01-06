import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Token {
    token: String!
    renewToken: String!
    user: User!
  }

  extend type Query {
    user(id: ID!): User!
    loginUser(username: String!, password: String!): Token!
    renewUser(renewToken: String!): Token!
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
  }
`;
