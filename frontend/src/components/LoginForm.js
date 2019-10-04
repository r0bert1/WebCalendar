import React, { useState  } from 'react'
import loginService from '../services/login'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username,
      password
    })
    console.log(user)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Username:
        <input
          type='text'
          value={username} 
          onChange={(event) => setUsername(event.target.value)} 
        />
        <br />
        Password:
        <input
          type='password'
          value={password} 
          onChange={(event) => setPassword(event.target.value)} 
        />
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default LoginForm