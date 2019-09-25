/* global gapi */
import React, { useState, useEffect } from "react"
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClientLoad = () => {
    const initClient = async () => {
      try {
        await gapi.client.init({
          apiKey: 'API_KEY',
          clientId: 'CLIENT_ID',
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: 'https://www.googleapis.com/auth/calendar'
        })

        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
          gapi.auth2.getAuthInstance().signIn()
        }

        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
      } catch (e) {
        console.log(e)
      }
    }

    const updateSigninStatus = (isSignedIn) => {
      if (isSignedIn) {
        console.log('you are signed in')
        listUpcomingEvents()
        //createCalendar()
      } else {
        console.log('you are signed out')
      }
    }

    const createCalendar = async () => {
      const response = await gapi.client.calendar.calendars.insert({
        "resource": {"summary": "js client test"}
      })
      const calendar = response.result
      console.log(calendar)
    }

    const listUpcomingEvents = async () => {
      const response = await gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      })
      const events = response.result.items
      console.log('Upcoming events:')

      if (events.length) {
        events.forEach((event) => {
          let when = event.start.dateTime
          if (!when) {
            when = event.start.date
          }
          console.log(event.summary + ' (' + when + ')')
        })
      } else {
        console.log('No upcoming events found.')
      }
    }

    gapi.load('client:auth2', initClient)
  }

  useEffect(() => {
    handleClientLoad()
  }, [])

  const handleSubmit = async (event) => {
    const user = await loginService.login({
      username,
      password
    })
    console.log(user)
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Username:
        <input
          type="text"
          value={username} 
          onChange={(event) => setUsername(event.target.value)} 
        />
        <br />
        Password:
        <input
          type="password"
          value={password} 
          onChange={(event) => setPassword(event.target.value)} 
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App
