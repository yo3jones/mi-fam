import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import LoginPage, { hooks } from './LoginPage';

describe('LoginPage', () => {
  let loginPage;
  let useLogin;
  let sandbox;
  let login;
  let onSuccess;
  let form;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    login = jest.fn();

    useLogin = sandbox
      .stub(hooks, 'useLogin')
      .returns([
        login,
        { loading: true, requiresLogin: false, error: null, session: null },
      ]);

    onSuccess = jest.fn();

    loginPage = shallow(<LoginPage onSuccess={onSuccess} />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('initial load', () => {
    it('renders the login form', () => {
      expect(loginPage.find('.LoginPage-form').length).toEqual(0);
    });
  });

  describe('requiresLogin', () => {
    beforeEach(() => {
      useLogin.returns([
        login,
        {
          loading: false,
          requiresLogin: true,
          error: null,
          session: null,
        },
      ]);
      loginPage.setProps({});
      form = loginPage.find('.LoginPage-form');
    });

    it('renders the login form', () => {
      expect(form.length).toEqual(1);
    });

    it('sets loading to false', () => {
      expect(form.prop('loading')).toBeFalsy();
    });

    it('sets a null error', () => {
      expect(form.prop('error')).toBeFalsy();
    });

    describe('error', () => {
      beforeEach(() => {
        useLogin.returns([
          login,
          {
            loading: false,
            requiresLogin: true,
            error: new Error(),
            session: null,
          },
        ]);
        loginPage.setProps({});
        form = loginPage.find('.LoginPage-form');
      });

      it('sets loading to false', () => {
        expect(form.prop('loading')).toBeFalsy();
      });

      it('sets a null error', () => {
        expect(form.prop('error')).toBeTruthy();
      });
    });
  });

  describe('login', () => {
    beforeEach(() => {
      useLogin.returns([
        login,
        {
          loading: false,
          requiresLogin: true,
          error: null,
          session: null,
        },
      ]);
      loginPage.setProps({});
      form = loginPage.find('.LoginPage-form');
      form.prop('onLogin')({ username: 'foo', password: 'bar' });
    });

    it('calls login with username and password', () => {
      expect(login).toBeCalledWith({
        variables: { username: 'foo', password: 'bar' },
      });
    });

    describe('success', () => {
      beforeEach(() => {
        useLogin.returns([
          login,
          {
            loading: false,
            requiresLogin: true,
            error: null,
            session: { is: 'session' },
          },
        ]);
        loginPage.setProps({});
      });

      it('calls onSuccess with session', () => {
        expect(onSuccess).toBeCalledWith({ is: 'session' });
      });
    });
  });
});
