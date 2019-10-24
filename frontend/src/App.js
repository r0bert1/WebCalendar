import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import LoginForm from './components/LoginForm'
import EventForm from './components/EventForm'
import eventService from './services/events'
import { Navbar, Container, Button } from 'react-bootstrap'

import './components/Navbar.css'

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
      const newEvents = await eventService.getAll(user.calendarId)
      setEvents(newEvents)
    }
    if (user) {
      fetchEvents()
    }
  }, [user])

  const handleLogout = () => {
    setUser(null)
    setEvents(null)
    window.localStorage.removeItem('user')
  }

  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Container>
        <Navbar.Brand>Calendar</Navbar.Brand>
          {user && 
            <div>
              <Navbar.Text>
                Signed in as: <em>{user.username}</em>
              </Navbar.Text>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          }
        </Container>
      </Navbar>
      <EventForm visible={popup} setVisible={setPopup} user={user} setEvents={setEvents} />
      <LoginForm user={user} setUser={setUser} />
      <Calendar user={user} showPopup={setPopup} events={events} />
    </div>
  )
}

export default App
