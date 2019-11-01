import React, { useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import '../calendar.scss'
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
    calendarApi.gotoDate(date) // e.g. '2019-11-09'
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
        columnHeaderFormat={{day: 'numeric'}}
        firstDay={1}
        nowIndicator={true}
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