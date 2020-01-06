import { gql } from 'apollo-server';
import { User } from '../../../src/models';
import { getUnauthenticatedClient, getAuthenticatedClient } from '../../utils';

describe('User resolvers', () => {
  let client;
  let user;
  let dbUser;

  beforeEach(async () => {
    client = await getUnauthenticatedClient();

    ({
      data: { createUser: user },
    } = await client.mutate({
      mutation: gql`
        mutation createUser(
          $name: String!
          $email: String!
          $password: String!
        ) {
          createUser(name: $name, email: $email, password: $password) {
            id
            name
            email
          }
        }
      `,
      variables: {
        name: 'Foo Bar',
        email: 'foo@mifam.ly',
        password: 'changeme',
      },
    }));

    dbUser = await User.findOne({ email: 'foo@mifam.ly' });
  });

  describe('Mutations', () => {
    describe('createUser', () => {
      it('response with a user', () => {
        expect(user).toMatchObject({
          name: 'Foo Bar',
          email: 'foo@mifam.ly',
        });
      });

      it('creates a user', () => {
        expect(dbUser).toMatchObject({
          name: 'Foo Bar',
          email: 'foo@mifam.ly',
          password: expect.anything(),
        });
      });

      it('hashes the password', () => {
        expect(dbUser).toMatchObject({
          password: expect.not.stringMatching('changeme'),
        });
      });
    });
  });

  describe('Queries', () => {
    let queryUser;
    let token;

    const loginUser = async (username, password) => {
      const {
        data: { loginUser: tokenResult },
      } = await client.query({
        query: gql`
          query loginUser($username: String!, $password: String!) {
            loginUser(username: $username, password: $password) {
              token
              renewToken
              user {
                id
                name
                email
              }
            }
          }
        `,
        variables: {
          username,
          password,
        },
      });

      return tokenResult;
    };

    beforeEach(async () => {
      token = await loginUser('foo@mifam.ly', 'changeme');
    });

    describe('user', () => {
      const getUser = async userId => {
        const {
          data: { user: userResult },
        } = await client.query({
          query: gql`
            query user($id: ID!) {
              user(id: $id) {
                name
                email
              }
            }
          `,
          variables: {
            id: userId,
          },
        });
        return userResult;
      };

      describe('with token', () => {
        beforeEach(async () => {
          client = await getAuthenticatedClient(token.token);

          queryUser = await getUser(dbUser.id);
        });

        it('response with a user', () => {
          expect(queryUser).toMatchObject({
            name: 'Foo Bar',
            email: 'foo@mifam.ly',
          });
        });
      });

      describe('wrong userId', () => {
        let err;

        beforeEach(async () => {
          client = await getAuthenticatedClient(token.token);
          try {
            await getUser('wrong');
          } catch (error) {
            err = error;
          }
        });

        it('response with an error', () => {
          expect(err).toBeDefined();
        });
      });

      describe('without token', () => {
        let err;

        beforeEach(async () => {
          try {
            await getUser(dbUser.id);
          } catch (error) {
            err = error;
          }
        });

        it('results in an error', () => {
          expect(err).toBeDefined();
        });
      });
    });

    describe('loginUser', () => {
      describe('successful', () => {
        it('response with a token', () => {
          expect(token).toMatchObject({
            token: expect.anything(),
            renewToken: expect.anything(),
            user: {
              id: dbUser.id,
              name: 'Foo Bar',
              email: 'foo@mifam.ly',
            },
          });
        });
      });

      describe('wrong password', () => {
        let err;

        beforeEach(async () => {
          try {
            await loginUser('foo@mifam.ly', 'wrongpassword');
          } catch (error) {
            err = error;
          }
        });

        it('responds with an error', () => {
          expect(err).toBeDefined();
        });
      });

      describe('wrong user', () => {
        let err;

        beforeEach(async () => {
          try {
            await loginUser('bar@mifam.ly', 'changeme');
          } catch (error) {
            err = error;
          }
        });

        it('responds with an error', () => {
          expect(err).toBeDefined();
        });
      });
    });

    describe('renewUser', () => {
      let renewResult;

      const renewUser = async renewToken => {
        const {
          data: { renewUser: qureyRenewResult },
        } = await client.query({
          query: gql`
            query renewUser($renewToken: String!) {
              renewUser(renewToken: $renewToken) {
                token
                renewToken
                user {
                  email
                }
              }
            }
          `,
          variables: {
            renewToken,
          },
        });

        return qureyRenewResult;
      };

      describe('success', () => {
        beforeEach(async () => {
          renewResult = await renewUser(token.renewToken);
        });

        it('response with tokens and user', () => {
          expect(renewResult).toMatchObject({
            token: expect.anything(),
            renewToken: expect.anything(),
            user: { email: 'foo@mifam.ly' },
          });
        });
      });
    });
  });
});
