import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import userService from '../services/users';

import './SignUpForm.css';

const SignUpForm = ({
  fetchInProgress,
  setFetchInProgress,
  user,
  setUser,
  setVisible
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const handleSignUp = async event => {
    event.preventDefault();
    setFetchInProgress(true);
    const newUser = await userService.create({
      username,
      password,
      confirmPw
    });
    setFetchInProgress(false);
    window.localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setUsername('');
    setPassword('');
    setConfirmPw('');
    setVisible(false);
  };

  if (user || fetchInProgress) {
    return null;
  }

  return (
    <div className="signup-form-container">
      <Form onSubmit={handleSignUp}>
        <h2 className="title">Sign up</h2>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPw}
            onChange={event => setConfirmPw(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUpForm;
