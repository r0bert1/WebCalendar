import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import eventService from '../services/events'
import { Popover, OverlayTrigger, Button } from 'react-bootstrap'

import '../calendar.scss'
import './Calendar.css'

const Calendar = (props) => {
  const [ showMore, setShowMore ] = useState(false)

  const handleDateClick = (dateInfo) => {
    props.showPopup(true)
  }

  const handleEventClick = async (eventInfo) => {
    //await eventService.remove(props.user.calendarId, eventInfo.event.id)
    setShowMore(true)
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  )

  const eventRender = (e) => {
    const el = e.el;
    const content = (
        <React.Fragment>
            {/*<div className="fc-content">
              hello world
            </div>
            <div className="fc-resizer fc-end-resizer" />*/}
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <div>hello</div>
          </OverlayTrigger>
        </React.Fragment>
    )
    ReactDOM.render(content, el);
    return el;
  }

  if (props.user) {
    return (
      <FullCalendar
        dateClick={handleDateClick}
        defaultView="dayGridMonth" 
        plugins={[ dayGridPlugin, interactionPlugin, bootstrapPlugin ]}
        themeSystem='bootstrap'
        events={props.events}
        eventClick={handleEventClick}
        eventRender={eventRender}
      />
    )
  }
  
  return (
    <div></div>
  )
}

export default Calendar