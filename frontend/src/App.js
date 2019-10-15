import React, { useState } from 'react'
import Calendar from './components/Calendar'
import LoginForm from './components/LoginForm'


const App = () => {
  const [user, setUser] = useState(null)

  return (
    <div>
      <LoginForm setUser={setUser} />
      <Calendar user={user} />
    </div>
  )
}

export default App
