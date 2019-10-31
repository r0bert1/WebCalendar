import React, {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import eventService from '../services/events'

import '../calendar.scss'
import './Calendar.css'

const Calendar = (props) => {
  const handleDateClick = (dateInfo) => {
    props.showCreate(true)
  }

  const handleEventClick = (info) => {
    props.setClickedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end
    })
    props.showModify(true)
  }

  if (props.user) {
    return (
      <FullCalendar
        dateClick={handleDateClick}
        defaultView="timeGridWeek"
        allDaySlot={false}
        plugins={[ timeGridPlugin, interactionPlugin, bootstrapPlugin ]}
        themeSystem='bootstrap'
        events={props.events}
        eventClick={handleEventClick}
      />
    )
  }
  
  return (
    <div></div>
  )
}

export default Calendar