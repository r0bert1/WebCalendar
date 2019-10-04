import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import '../calendar.scss' 

const Calendar = () => {
  return (
    <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
  )
}

export default Calendar