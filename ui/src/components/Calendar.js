import React, { useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import './Calendar.scss'
import './Calendar.css'

const Calendar = (props) => {
  const calendarRef = useRef()
  const containerRef = useRef()

  useEffect(() => {
    if (props.user && props.date) {
      handleDateChange(props.date)
    }
  }, [calendarRef, props.user, props.date])

  useEffect(() => {
    handleWindowResize()
  }, [])

  const handleDateChange = (date) => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.gotoDate(date)
  }

  const handleWindowResize = () => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.setOption('height', 100)
    const container = containerRef.current
    calendarApi.setOption('height', container.offsetHeight - 32)
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

  return (
    <div className='calendar-container' ref={containerRef}>
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
        height={100}
        windowResize={handleWindowResize}
      />
    </div>
  )
}

export default Calendar