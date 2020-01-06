import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import { generateAccessToken } from '../src/resolvers/utils';
import factory from './factories';

let userMemo;
let accessTokenMemo;

export const createUser = async () =>
  factory.create('user', { name: 'Chris Jones', email: 'chris@mifam.ly' });

export const getAccessToken = async user => generateAccessToken(user);

export const getUnauthenticatedClient = async () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `http://localhost:${process.env.TEST_PORT}/graphql`,
      fetch,
    }),
  });

export const getAuthenticatedClient = async accessToken =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `http://localhost:${process.env.TEST_PORT}/graphql`,
      fetch,
      headers: { 'X-ACCESS-TOKEN': accessToken },
    }),
  });

export const getClientForUser = async user => {
  const [accessToken] = await getAccessToken(user);
  return getAuthenticatedClient(accessToken);
};

export const getClient = async () => {
  if (!userMemo) userMemo = await createUser();
  if (!accessTokenMemo) [accessTokenMemo] = await getAccessToken(userMemo);

  return getAuthenticatedClient(accessTokenMemo);
};
