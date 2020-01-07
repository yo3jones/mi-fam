import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import App, { hooks } from './App';

describe('App', () => {
  let app;
  let sandbox;
  let useRouteMatch;
  let loginForm;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    useRouteMatch = sandbox.stub(hooks, 'useRouteMatch');
    useRouteMatch.returns(false);

    app = shallow(<App />);

    loginForm = app.find('LoginPage');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Not logged in', () => {
    it('renders the LoginPage', () => {
      expect(loginForm).toBeTruthy();
    });
  });

  describe('Logged in', () => {
    beforeEach(() => {
      loginForm.props().onSuccess();
    });

    describe('default page', () => {
      beforeEach(() => {});

      it('renders the overview page', () => {
        expect(app.find('h1').text()).toEqual('Dashboard');
      });
    });

    describe('settings page', () => {
      beforeEach(() => {
        useRouteMatch.withArgs('/settings').returns(true);
        app.setProps({});
      });

      it('renders the overview page', () => {
        expect(app.find('h1').text()).toEqual('Settings');
      });
    });
  });
});
