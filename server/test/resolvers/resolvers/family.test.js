import { gql } from 'apollo-server';
import { getUnauthenticatedClient, getClientForUser } from '../../utils';
import factory from '../../factories';

describe('Family Resolver', () => {
  let client;
  let family;
  let user;
  let error;

  beforeEach(async () => {
    error = null;
    user = await factory.create('user', { name: 'foo', email: 'foo@mifam.ly' });
    client = await getClientForUser(user);
  });

  describe('mutations', () => {
    describe('createFamily', () => {
      const createFamily = async (
        familyInput = { name: 'foo', display: 'bar' }
      ) => {
        ({
          data: { createFamily: family },
        } = await client.mutate({
          mutation: gql`
            mutation createFamily($family: FamilyInput!) {
              createFamily(family: $family) {
                id
                name
                display
                userIds
                users {
                  name
                }
              }
            }
          `,
          variables: { family: familyInput },
        }));
      };

      describe('success', () => {
        beforeEach(async () => {
          await createFamily();
        });

        it('creates a family', async () => {
          expect(family).toMatchObject({
            id: expect.anything(),
            name: 'foo',
            display: 'bar',
            userIds: [user.id],
            users: [{ name: 'foo' }],
          });
        });
      });

      describe('failure', () => {
        beforeEach(async () => {});

        describe('no access token', () => {
          beforeEach(async () => {
            client = await getUnauthenticatedClient();

            try {
              await createFamily();
            } catch (err) {
              error = err;
            }
          });

          it('errors', () => {
            expect(error).toBeTruthy();
          });
        });
      });
    });
  });

  describe('queries', () => {
    beforeEach(async () => {
      client = await getClientForUser(user);

      family = await factory.create('family', {
        name: 'foo',
        display: 'bar',
        userIds: [user.id],
      });
    });

    let foundFamily;

    describe('family', () => {
      const queryFamily = async (id = family.id) => {
        ({
          data: { family: foundFamily },
        } = await client.query({
          query: gql`
            query family($id: ID!) {
              family(id: $id) {
                id
                name
                display
                userIds
                users {
                  name
                }
              }
            }
          `,
          variables: { id },
        }));
      };

      describe('success', () => {
        beforeEach(async () => {
          await queryFamily();
        });

        it('responds with a family', () => {
          expect(foundFamily).toMatchObject({
            id: expect.anything(),
            name: 'foo',
            display: 'bar',
            userIds: family.userIds.map(id => id.toString()),
            users: [{ name: 'foo' }],
          });
        });
      });

      describe('unauthorized', () => {
        describe('no auth', () => {
          beforeEach(async () => {
            client = await getUnauthenticatedClient();
            try {
              await queryFamily();
            } catch (err) {
              error = err;
            }
          });

          it('errors', () => {
            expect(error).toBeTruthy();
          });
        });

        describe('not  part of family', () => {
          beforeEach(async () => {
            user = await factory.create('user', {
              name: 'bar',
              email: 'bar@mifam.ly',
            });

            client = await getClientForUser(user);

            try {
              await queryFamily();
            } catch (err) {
              error = err;
            }
          });

          it('errors', () => {
            expect(error).toBeTruthy();
          });
        });
      });
    });
  });
});
