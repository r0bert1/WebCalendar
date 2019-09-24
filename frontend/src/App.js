/* global gapi */
import React, { useState, useEffect } from "react"

const App = () => {
  const [events, setEvents] = useState([])

  const handleClientLoad = () => {
    function initClient() {
      gapi.client.init({
        apiKey: 'API_KEY',
        clientId: 'CLIENT_ID',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: 'https://www.googleapis.com/auth/calendar'
      }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Sign in if currently signed out.
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
          gapi.auth2.getAuthInstance().signIn()
        }
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      }, function(error) {
        console.log(error)
      });
    }

    function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        console.log('you are signed in')
        //listUpcomingEvents()
        //createCalendar()
      } else {
        console.log('you are signed out')
      }
    }

    const createCalendar = () => {
      gapi.client.calendar.calendars.insert({
        "resource": {"summary": "js client test"}
      }).then(function(response) {
        const calendar = response.result
        console.log(calendar)
      })
    }

    function listUpcomingEvents() {
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(function(response) {
        var events = response.result.items;
        console.log('Upcoming events:');

        if (events.length > 0) {
          for (let i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            console.log(event.summary + ' (' + when + ')')
          }
        } else {
          console.log('No upcoming events found.')
        }
      });
    }

    gapi.load('client:auth2', initClient)
  }

  useEffect(() => {
    handleClientLoad()
  }, [])

  return (
    <div>
      <ul>
        {events.map((event) =>
          <li key={event.id}>
            {event.summary}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
