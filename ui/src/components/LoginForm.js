import React, { useState  } from 'react'
import loginService from '../services/login'
import { Button, Form } from 'react-bootstrap'

import './LoginForm.css'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username,
      password
    })
    window.localStorage.setItem('user', JSON.stringify(user))
    props.setUser(user)
    props.setDate(new Date())
    setUsername('')
    setPassword('')
  }

  if (props.user || props.fetchInProgress) {
    return null
  }

  return (
    <div className='login-form-container'>
      <Form onSubmit={handleLogin}>
        <h2 className='title'>Log in</h2>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            data-cy='username'
            type='text'
            placeholder='Enter username'
            value={username} 
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-cy='password'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm