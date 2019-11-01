import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import LoginForm from './components/LoginForm'
import EventCreateForm from './components/EventCreateForm'
import EventModifyForm from './components/EventModifyForm'
import eventService from './services/events'
import { Navbar, Button } from 'react-bootstrap'
import DatePicker from 'react-calendar'

import './components/Navbar.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [create, setCreate] = useState(false)
  const [modify, setModify] = useState(false)
  const [events, setEvents] = useState([])
  const [clickedDate, setClickedDate] = useState(null)
  const [clickedEvent, setClickedEvent] = useState(null)
  const [date, setDate] = useState(new Date())

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
        <Navbar.Brand>WebCalendar</Navbar.Brand> 
        {user && 
          <React.Fragment>
            <Navbar.Text>
              <em>{user.username}</em>
            </Navbar.Text>
            <Button onClick={handleLogout}>Logout</Button>
          </React.Fragment>
        }
      </Navbar>
      <EventCreateForm 
        visible={create} 
        setVisible={setCreate} 
        user={user}
        events={events}
        setEvents={setEvents}
        clickedDate={clickedDate}
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
      <div className='calendarRow'>
        <div className='datePicker'>
          {user && 
            <DatePicker
              locale='en'
              onChange={(date) => setDate(date)}
              value={date}
            />
          }
        </div>
        <div className='calendar-container'>
          <Calendar
            date={date}
            user={user} 
            showCreate={setCreate} 
            showModify={setModify} 
            events={events}
            setClickedDate={setClickedDate}
            setClickedEvent={setClickedEvent}
          />
        </div>
      </div>
    </div>
  )
}

export default App
