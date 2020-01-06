import { gql } from 'apollo-server';

export default gql`
  input FamilyInput {
    name: String!
    display: String!
  }

  type Family {
    id: ID!
    name: String!
    display: String!
    users: [User]
    userIds: [ID!]!
  }

  extend type Query {
    family(id: ID!): Family!
  }

  extend type Mutation {
    createFamily(family: FamilyInput!): Family!
  }
`;
