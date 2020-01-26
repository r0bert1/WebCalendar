import React, { useState, useEffect } from 'react';
import { Navbar, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-calendar';
import Calendar from './components/Calendar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import EventCreateForm from './components/EventCreateForm';
import EventModifyForm from './components/EventModifyForm';
import eventService from './services/events';

import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [create, setCreate] = useState(false);
  const [modify, setModify] = useState(false);
  const [events, setEvents] = useState([]);
  const [clickedDate, setClickedDate] = useState(null);
  const [clickedEvent, setClickedEvent] = useState(null);
  const [date, setDate] = useState(new Date());
  const [signUp, setSignUp] = useState(false);
  const [fetchInProgress, setFetchInProgress] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const newEvents = await eventService.getAll(user.calendarId);
      if (newEvents) {
        setEvents(newEvents);
      }
    };
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setEvents([]);
    window.localStorage.removeItem('user');
  };

  return (
    <div className="main">
      <Navbar bg="dark" variant="dark" className="navbar-container">
        <Navbar.Brand>WebCalendar</Navbar.Brand>
        <div>
          {user ? (
            <>
              <Navbar.Text>
                <em>{user.username}</em>
              </Navbar.Text>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : null}
          {!user &&
            (signUp ? (
              <Button onClick={() => setSignUp(false)}>Log in</Button>
            ) : (
              <Button onClick={() => setSignUp(true)}>Sign up</Button>
            ))}
        </div>
      </Navbar>
      {signUp ? (
        <SignUpForm
          setVisible={setSignUp}
          user={user}
          setUser={setUser}
          fetchInProgress={fetchInProgress}
          setFetchInProgress={setFetchInProgress}
        />
      ) : (
        <LoginForm
          setDate={setDate}
          user={user}
          setUser={setUser}
          fetchInProgress={fetchInProgress}
        />
      )}
      {fetchInProgress && (
        <div className="spinner-container">
          <Spinner animation="border">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {user && (
        <>
          <div className="datepicker-container">
            <DatePicker
              locale="en"
              onChange={data => setDate(data)}
              value={date}
            />
          </div>
          <Calendar
            date={date}
            user={user}
            showCreate={setCreate}
            showModify={setModify}
            events={events}
            setClickedDate={setClickedDate}
            setClickedEvent={setClickedEvent}
          />
        </>
      )}
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
    </div>
  );
};

export default App;
