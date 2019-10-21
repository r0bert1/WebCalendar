import React, { useState  } from 'react'
import loginService from '../services/login'
import { Button, Form } from 'react-bootstrap'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username,
      password
    })
    window.localStorage.setItem('user', JSON.stringify(user))
    props.setUser(user)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username} 
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <div>
        {props.user && <p>logged in as {props.user.username}</p>}
      </div>
    </div>
  )
}

export default LoginForm