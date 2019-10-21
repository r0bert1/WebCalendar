import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import LoginForm from './components/LoginForm'
import EventForm from './components/EventForm'
import eventService from './services/events'


const App = () => {
  const [user, setUser] = useState(null)
  const [popup, setPopup] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      const newEvents = await eventService.getUserEvents(user.calendarId)
      setEvents(newEvents)
    }
    if (user) {
      fetchEvents()
    }
  }, [user])

  return (
    <div>
      <EventForm visible={popup} setVisible={setPopup} user={user} setEvents={setEvents} />
      <LoginForm user={user} setUser={setUser} />
      <Calendar user={user} showPopup={setPopup} events={events} />
    </div>
  )
}

export default App
