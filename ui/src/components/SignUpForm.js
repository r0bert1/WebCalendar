import React, { useState  } from 'react'
import userService from '../services/users'
import { Button, Form, Container, Row } from 'react-bootstrap'

const SignUpForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const handleSignUp = async (event) => {
    event.preventDefault()
    const user = await userService.create({
      username,
      password,
      confirmPw
    })
    window.localStorage.setItem('user', JSON.stringify(user))
    props.setUser(user)
    setUsername('')
    setPassword('')
    setConfirmPw('')
    props.setVisible(false)
  }

  if (props.user) {
    return null
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Form onSubmit={handleSignUp}>
          <h2 className='title'>Sign up</h2>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              value={username} 
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPw}
              onChange={(event) => setConfirmPw(event.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default SignUpForm