import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import LoginForm from './components/LoginForm'
import EventCreateForm from './components/EventCreateForm'
import EventModifyForm from './components/EventModifyForm'
import eventService from './services/events'
import { Navbar, Container, Button } from 'react-bootstrap'

import './components/Navbar.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [create, setCreate] = useState(false)
  const [modify, setModify] = useState(false)
  const [events, setEvents] = useState([])
  const [clickedEvent, setClickedEvent] = useState(null)

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
      <EventCreateForm 
        visible={create} 
        setVisible={setCreate} 
        user={user}
        events={events}
        setEvents={setEvents} 
      />
      <EventModifyForm
        visible={modify} 
        setVisible={setModify} 
        user={user}
        events={events}
        setEvents={setEvents} 
        clickedEvent={clickedEvent}
      />
      <LoginForm 
        user={user} 
        setUser={setUser} 
      />
      <Calendar
        user={user} 
        showCreate={setCreate} 
        showModify={setModify} 
        events={events} 
        setClickedEvent={setClickedEvent}
      />
    </div>
  )
}

export default App
