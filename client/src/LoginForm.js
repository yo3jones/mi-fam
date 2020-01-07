import React, { useState } from 'react';
import { withTitle as Logo } from './core/Logo';
import './LoginForm.css';
import TextField from './md/TextField';
import Button from './md/Button';

const propTypes = {};

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="LoginForm">
      <Logo className="LoginForm-logo" />

      <div className="LoginForm-input-wrapper">
        <TextField
          className="LoginForm-username"
          value={username}
          label="Username"
        >
          <input
            className="LoginForm-username-input"
            type="text"
            value={username}
            onChange={({ currentTarget: { value } }) => setUsername(value)}
          />
        </TextField>

        <TextField
          className="LoginForm-password"
          value={password}
          label="Password"
          type="password"
        >
          <input
            className="LoginForm-password-input"
            type="password"
            value={password}
            onChange={({ currentTarget: { value } }) => setPassword(value)}
          />
        </TextField>

        <Button
          className="LoginForm-login"
          label="Login"
          handleClick={() => onLogin({ username, password })}
        />
      </div>
    </div>
  );
};

LoginForm.propTypes = propTypes;

export default LoginForm;
