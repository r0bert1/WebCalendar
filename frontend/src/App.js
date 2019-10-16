import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import LoginForm from './components/LoginForm'
import EventForm from './components/EventForm'


const App = () => {
  const [user, setUser] = useState(null)
  const [popup, setPopup] = useState(false)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <EventForm visible={popup} setVisible={setPopup} />
      <LoginForm user={user} setUser={setUser} />
      <Calendar user={user} showPopup={setPopup} />
    </div>
  )
}

export default App
