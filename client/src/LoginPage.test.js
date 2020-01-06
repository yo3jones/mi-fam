import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import LoginPage, { hooks } from './LoginPage';
import { userLogin } from './graphql';

describe('LoginPage', () => {
  let loginPage;
  let useLazyQuery;
  let useLogin;
  let sandbox;
  let login;
  let onSuccess;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    useLazyQuery = sandbox.stub(hooks, 'useLazyQuery');
    login = jest.fn();
    useLazyQuery.withArgs(userLogin).returns([login, {}]);

    useLogin = sandbox.stub(hooks, 'useLogin').returns([login, {}]);

    onSuccess = jest.fn();

    loginPage = shallow(<LoginPage onSuccess={onSuccess} />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('update username', () => {
    beforeEach(() => {
      loginPage
        .find('.LoginPage-username-input')
        .simulate('change', { currentTarget: { value: 'foo' } });
    });

    it('updates the username value', () => {
      expect(loginPage.find('.LoginPage-username').prop('value')).toBe('foo');
    });
  });

  describe('update password', () => {
    beforeEach(() => {
      loginPage
        .find('.LoginPage-password-input')
        .simulate('change', { currentTarget: { value: 'bar' } });
    });

    it('updates the password value', () => {
      expect(loginPage.find('.LoginPage-password').prop('value')).toEqual(
        'bar'
      );
    });
  });

  describe('login', () => {
    beforeEach(() => {
      loginPage
        .find('.LoginPage-username-input')
        .simulate('change', { currentTarget: { value: 'foo' } });
      loginPage
        .find('.LoginPage-password-input')
        .simulate('change', { currentTarget: { value: 'bar' } });

      loginPage
        .find('.LoginPage-login')
        .props()
        .handleClick();
    });

    it('calls login', () => {
      expect(login).toBeCalledWith({
        variables: { username: 'foo', password: 'bar' },
      });
    });
  });

  describe('login success', () => {
    beforeEach(() => {
      useLogin.returns([login, { session: { foo: 'bar' } }]);

      loginPage.setProps({});
    });

    it('calls onSuccess with data', () => {
      expect(onSuccess).toBeCalledWith({ foo: 'bar' });
    });
  });
});
