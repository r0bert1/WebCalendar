import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import eventService from '../services/events'
import { Popover, OverlayTrigger, Form, Button } from 'react-bootstrap'
import DateTime from 'react-datetime'

import '../calendar.scss'
import './Calendar.css'

const Calendar = (props) => {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  const handleDateClick = (dateInfo) => {
    props.showPopup(true)
  }

  const handleEventUpdate = (event) => {
    console.log(event.target)
  }

  const eventRender = (e) => {
    const el = e.el
    const popover = (
      <Popover >
        <Popover.Content>
          <Form onSubmit={handleEventUpdate}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                defaultValue={e.event.title}
              />
            </Form.Group>
  
            <Form.Group>
              <Form.Label>Start</Form.Label>
              <DateTime
                defaultValue={e.event.start}
              />
            </Form.Group>
  
            <Form.Group>
              <Form.Label>End</Form.Label>
              <DateTime
                defaultValue={e.event.end}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Save
            </Button>
          </Form>
        </Popover.Content>
      </Popover>
    )
    
    const content = (
      <React.Fragment>
        <OverlayTrigger
          trigger="click"
          placement="top"
          overlay={popover}
          rootClose>
          <div id='popover-div'>
            {e.event.start.getHours()}:{e.event.start.getMinutes()}
            <br/>
            {e.event.title}
          </div>
        </OverlayTrigger>
      </React.Fragment>
    )
    ReactDOM.render(content, el)
    return el
  }

  if (props.user) {
    return (
      <FullCalendar
        dateClick={handleDateClick}
        defaultView="dayGridMonth" 
        plugins={[ dayGridPlugin, interactionPlugin, bootstrapPlugin ]}
        themeSystem='bootstrap'
        events={props.events}
        eventRender={eventRender}
      />
    )
  }
  
  return (
    <div></div>
  )
}

export default Calendar