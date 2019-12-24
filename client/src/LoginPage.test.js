import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  let loginPage;

  describe('render', () => {
    beforeAll(() => {
      loginPage = shallow(<LoginPage />);
    });

    it('renders', () => {});
  });

  describe('update username', () => {
    beforeAll(() => {
      (loginPage = shallow(<LoginPage />))
        .find('.LoginPage-username')
        .prop('handleChange')({ value: 'foo' });
    });

    it('updates the username value', () => {
      expect(loginPage.find('.LoginPage-username').prop('value')).toBe('foo');
    });
  });

  describe('update password', () => {
    beforeAll(() => {
      (loginPage = shallow(<LoginPage />))
        .find('.LoginPage-password')
        .prop('handleChange')({ value: 'bar' });
    });

    it('updates the password value', () => {
      expect(loginPage.find('.LoginPage-password').prop('value')).toEqual(
        'bar'
      );
    });
  });
});
