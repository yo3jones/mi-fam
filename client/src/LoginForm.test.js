import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  let loginForm;
  let onLogin;

  beforeEach(() => {
    onLogin = jest.fn();
    loginForm = shallow(<LoginForm onLogin={onLogin} />);
  });

  describe('login', () => {
    beforeEach(() => {
      loginForm
        .find('.LoginForm-username-input')
        .simulate('change', { currentTarget: { value: 'foo' } });
      loginForm
        .find('.LoginForm-password-input')
        .simulate('change', { currentTarget: { value: 'bar' } });

      loginForm
        .find('.LoginForm-login')
        .props()
        .handleClick();
    });

    it('calls onLogin', () => {
      expect(onLogin).toBeCalledWith({ username: 'foo', password: 'bar' });
    });
  });
});
