/* global gapi */
import React, { useState, useEffect } from "react"

const App = () => {
  const [events, setEvents] = useState([])

  const getEvents = () => {
    function start() {
      gapi.client.init({
        'apiKey': 'API_KEY'
      }).then(function() {
        return gapi.client.request({
          'path': 'https://www.googleapis.com/calendar/v3/calendars/CALENDAR_ID/events',
        })
      }).then( (response) => {
        let events = response.result.items
        console.log(events)
        setEvents(events)
      }, function(reason) {
        console.log(reason);
      });
    }
    gapi.load('client', start)
  }

  useEffect(() => {
    getEvents()
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
