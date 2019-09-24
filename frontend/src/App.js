import React, { useState } from "react"
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username: username,
      password: password
    })
    console.log(user)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Username:
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        Password:
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default App
