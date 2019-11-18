import React, { useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import './Calendar.scss'
import './Calendar.css'

const Calendar = (props) => {
  const calendarRef = useRef()

  useEffect(() => {
    if (props.user && props.date) {
      handleDateChange(props.date)
    }
  }, [calendarRef, props.user, props.date])

  const handleDateChange = (date) => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.gotoDate(date)
  }

  const handleDateClick = (info) => {
    props.setClickedDate(info.date)
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
        ref={calendarRef}
        header={{
          left:'prev',
          center:'title',
          right:'next'
        }}
        columnHeaderFormat={{day: 'numeric'}}
        firstDay={1}
        now={props.date}
        dateClick={handleDateClick}
        defaultView="timeGridWeek"
        allDaySlot={false}
        plugins={[ timeGridPlugin, interactionPlugin, bootstrapPlugin ]}
        themeSystem='bootstrap'
        events={props.events}
        eventClick={handleEventClick}
        eventTextColor='#FFF'
        height='parent'
      />
    )
  }
  
  return null
}

export default Calendar