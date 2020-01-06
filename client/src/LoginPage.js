import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { withTitle as Logo } from './core/Logo';
import './LoginPage.css';
import TextField from './md/TextField';
import Button from './md/Button';
import { useLogin } from './hooks';

const propTypes = {};

export const hooks = {
  useLazyQuery,
  useLogin,
};

const LoginPage = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { session }] = hooks.useLogin();

  if (session) {
    onSuccess(session);
  }

  return (
    <div className="LoginPage">
      <Logo className="LoginPage-logo" />

      <div className="LoginPage-input-wrapper">
        <TextField
          className="LoginPage-username"
          value={username}
          label="Username"
        >
          <input
            className="LoginPage-username-input"
            type="text"
            value={username}
            onChange={({ currentTarget: { value } }) => setUsername(value)}
          />
        </TextField>

        <TextField
          className="LoginPage-password"
          value={password}
          label="Password"
          type="password"
        >
          <input
            className="LoginPage-password-input"
            type="password"
            value={password}
            onChange={({ currentTarget: { value } }) => setPassword(value)}
          />
        </TextField>

        <Button
          className="LoginPage-login"
          label="Login"
          handleClick={() => login({ variables: { username, password } })}
        />
      </div>
    </div>
  );
};

LoginPage.propTypes = propTypes;

export default LoginPage;
