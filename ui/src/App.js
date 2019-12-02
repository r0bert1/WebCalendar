import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import EventCreateForm from './components/EventCreateForm'
import EventModifyForm from './components/EventModifyForm'
import eventService from './services/events'
import { Navbar, Button, Col } from 'react-bootstrap'
import DatePicker from 'react-calendar'

import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [create, setCreate] = useState(false)
  const [modify, setModify] = useState(false)
  const [events, setEvents] = useState([])
  const [clickedDate, setClickedDate] = useState(null)
  const [clickedEvent, setClickedEvent] = useState(null)
  const [date, setDate] = useState(new Date())
  const [signUp, setSignUp] = useState(false)

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
      if (newEvents) {
        setEvents(newEvents)
      }
    }
    if (user) {
      fetchEvents()
    }
  }, [user])

  const handleLogout = () => {
    setUser(null)
    setEvents([])
    window.localStorage.removeItem('user')
  }

  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Col>
          <Navbar.Brand>WebCalendar</Navbar.Brand> 
        </Col>
        <Col className="LoginInfo">
          {user 
            ? <React.Fragment>
                <Navbar.Text>
                  <em>{user.username}</em>
                </Navbar.Text>
                <Button onClick={handleLogout}>Logout</Button>
              </React.Fragment>
            : null
          }
          {!user &&
            (signUp
              ? <Button onClick={() => setSignUp(false)}>Log in</Button>
              : <Button onClick={() => setSignUp(true)}>Sign up</Button>
            )
          }
        </Col>
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
      {signUp
        ? <SignUpForm 
            setVisible={setSignUp}
            user={user} 
            setUser={setUser} 
          />
        : <LoginForm 
            setDate={setDate}
            user={user} 
            setUser={setUser} 
          />
      }
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
