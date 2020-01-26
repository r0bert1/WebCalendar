import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import loginService from '../services/login';

import './LoginForm.css';

const LoginForm = ({ user, setUser, fetchInProgress, setDate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async event => {
    event.preventDefault();
    const loggedUser = await loginService.login({
      username,
      password
    });
    window.localStorage.setItem('user', JSON.stringify(loggedUser));
    setUser(loggedUser);
    setDate(new Date());
    setUsername('');
    setPassword('');
  };

  if (user || fetchInProgress) {
    return null;
  }

  return (
    <div className="login-form-container">
      <Form onSubmit={handleLogin}>
        <h2 className="title">Log in</h2>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            data-cy="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-cy="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
