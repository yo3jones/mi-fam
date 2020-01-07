import React from 'react';
import './LoginPage.css';
import { useLogin } from './hooks';
import LoginForm from './LoginForm';

const propTypes = {};

export const hooks = {
  useLogin,
};

const LoginPage = ({ onSuccess }) => {
  const [login, { loading, requiresLogin, error, session }] = hooks.useLogin();

  if (session) {
    onSuccess(session);
  }

  return (
    <div className="LoginPage">
      {requiresLogin ? (
        <LoginForm
          className="LoginPage-form"
          loading={loading}
          error={error}
          onLogin={({ username, password }) =>
            login({ variables: { username, password } })
          }
        />
      ) : (
        ''
      )}
    </div>
  );
};

LoginPage.propTypes = propTypes;

export default LoginPage;
