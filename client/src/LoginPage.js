import React, { useState } from 'react';
import { withTitle as Logo } from './core/Logo';
import './LoginPage.css';
import TextField from './md/TextField';
import Button from './md/Button';

const propTypes = {};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="LoginPage">
      <Logo className="LoginPage-logo" />

      <div className="LoginPage-input-wrapper">
        <TextField
          className="LoginPage-username"
          value={username}
          label="Username"
          handleChange={({ value }) => setUsername(value)}
        />

        <TextField
          className="LoginPage-password"
          value={password}
          label="Password"
          type="password"
          handleChange={({ value }) => setPassword(value)}
        />

        <Button className="LoginPage-login" label="Login" />
      </div>
    </div>
  );
};

LoginPage.propTypes = propTypes;

export default LoginPage;
