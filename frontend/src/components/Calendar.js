import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import '../calendar.scss'

const Calendar = (props) => {
  if (props.user) {
    return (
      <FullCalendar 
        defaultView="dayGridMonth" 
        plugins={[ dayGridPlugin ]}
        events={props.user.events} 
      />
    )
  }
  return (
    <FullCalendar 
      defaultView="dayGridMonth" 
      plugins={[ dayGridPlugin ]} 
    />
  )
}

export default Calendar