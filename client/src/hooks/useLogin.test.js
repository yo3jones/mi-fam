import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import useLogin from './useLogin';
import { userLogin, renewUser } from '../graphql';

const XCustom = () => {
  const [login, state] = useLogin();

  return (
    <button
      type="button"
      onClick={() =>
        login({
          variables: { username: 'chris@mifam.ly', password: 'changeme' },
        })
      }
    >
      {JSON.stringify(state)}
    </button>
  );
};

const wait = duration =>
  act(() => new Promise(resolve => setTimeout(resolve, duration)));

describe('useLogin', () => {
  let wrapper;
  let state;
  let tokenResult;

  describe('last token', () => {
    beforeEach(() => {
      window.localStorage.setItem(
        'mifamly-session',
        JSON.stringify({ renewToken: 'renewToken' })
      );

      tokenResult = {
        data: {
          renewUser: {
            token: 'token',
            renewToken: 'newRenewToken',
            user: { name: 'Chris Jones' },
          },
        },
      };
    });

    describe('loading', () => {
      beforeEach(async () => {
        wrapper = mount(
          <MockedProvider mocks={[]}>
            <XCustom />
          </MockedProvider>
        );

        state = JSON.parse(wrapper.find('button').text());

        await wait(0);
      });

      it('sets loading as true', () => {
        expect(state).toMatchObject({ loading: true, requiresLogin: false });
      });
    });

    describe('renewed', () => {
      beforeEach(async () => {
        const mock = {
          request: {
            query: renewUser,
            variables: { renewToken: 'renewToken' },
          },
          result: tokenResult,
        };

        wrapper = mount(
          <MockedProvider mocks={[mock]} addTypename={false}>
            <XCustom />
          </MockedProvider>
        );

        await wait(0);

        state = JSON.parse(wrapper.find('button').text());
      });

      it('sets the data with the session', () => {
        expect(state).toMatchObject({
          session: { token: 'token', renewToken: 'newRenewToken' },
          requiresLogin: false,
        });
      });
    });

    describe('error', () => {
      beforeEach(async () => {
        const mock = {
          request: {
            query: renewUser,
          },
          error: new Error(),
        };

        wrapper = mount(
          <MockedProvider mocks={[mock]} addTypename={false}>
            <XCustom />
          </MockedProvider>
        );

        await wait(0);

        state = JSON.parse(wrapper.find('button').text());
      });

      it('sets the requiresLogin flag', () => {
        expect(state).toMatchObject({ requiresLogin: true });
      });
    });
  });

  describe('no local session', () => {
    beforeEach(() => {
      window.localStorage.removeItem('mifamly-session');

      tokenResult = {
        data: {
          loginUser: {
            token: 'token',
            renewToken: 'newRenewToken',
            user: { name: 'Chris Jones' },
          },
        },
      };
    });

    describe('requiresLogin', () => {
      beforeEach(async () => {
        wrapper = mount(
          <MockedProvider mocks={[]}>
            <XCustom />
          </MockedProvider>
        );

        state = JSON.parse(wrapper.find('button').text());

        await wait(0);
      });

      it('sets requiresLogin', () => {
        expect(state).toMatchObject({ requiresLogin: true });
      });
    });

    describe('login', () => {
      describe('loading', () => {
        beforeEach(async () => {
          wrapper = mount(
            <MockedProvider mocks={[]}>
              <XCustom />
            </MockedProvider>
          );

          wrapper.find('button').simulate('click');

          state = JSON.parse(wrapper.find('button').text());

          await wait(0);
        });

        it('sets loading', () => {
          expect(state).toMatchObject({ loading: true, requiresLogin: true });
        });
      });

      describe('success', () => {
        beforeEach(async () => {
          const mock = {
            request: {
              query: userLogin,
              variables: {
                username: 'chris@mifam.ly',
                password: 'changeme',
              },
            },
            result: tokenResult,
          };

          wrapper = mount(
            <MockedProvider mocks={[mock]} addTypename={false}>
              <XCustom />
            </MockedProvider>
          );

          wrapper.find('button').simulate('click');

          await wait(0);

          state = JSON.parse(wrapper.find('button').text());
        });

        it('sets the session', () => {
          expect(state).toMatchObject({
            session: { token: 'token', renewToken: 'newRenewToken' },
            requiresLogin: false,
          });
        });
      });

      describe('failure', () => {
        beforeEach(async () => {
          const mock = {
            request: {
              query: userLogin,
              variables: {
                username: 'chris@mifam.ly',
                password: 'changeme',
              },
            },
            error: new Error(),
          };

          wrapper = mount(
            <MockedProvider mocks={[mock]} addTypename={false}>
              <XCustom />
            </MockedProvider>
          );

          wrapper.find('button').simulate('click');

          await wait(0);

          state = JSON.parse(wrapper.find('button').text());
        });

        it('sets the error', () => {
          expect(state).toMatchObject({
            error: expect.anything(),
            requiresLogin: true,
          });
        });
      });
    });
  });
});
