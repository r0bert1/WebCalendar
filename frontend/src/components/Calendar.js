import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import '../calendar.scss'

const Calendar = (props) => {
  const handleDateClick = (arg) => {
    props.showPopup(true)
  }

  if (props.user) {
    return (
      <FullCalendar
        dateClick={handleDateClick}
        defaultView="dayGridMonth" 
        plugins={[ dayGridPlugin, interactionPlugin, bootstrapPlugin ]}
        themeSystem='bootstrap'
        events={props.user.events}
      />
    )
  }
  return (
    <div></div>
  )
}

export default Calendar