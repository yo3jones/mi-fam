import ApolloClient, { gql } from 'apollo-boost';

export const createClient = () =>
  new ApolloClient({
    uri: '/graphql',
  });

export const userLogin = gql`
  query loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      renewToken
      user {
        name
      }
    }
  }
`;

export const renewUser = gql`
  query renewUser($renewToken: String!) {
    renewUser(renewToken: $renewToken) {
      token
      renewToken
      user {
        name
      }
    }
  }
`;
