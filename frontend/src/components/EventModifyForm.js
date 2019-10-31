import React, { useState, useEffect, } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import eventService from '../services/events'
import DateTimePicker from 'react-datetime-picker'

import './DateTimePicker.css'

const EventModifyForm = (props) => {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

  useEffect(() => {
    if (props.clickedEvent) {
      setTitle(props.clickedEvent.title)
      setStart(props.clickedEvent.start)
      setEnd(props.clickedEvent.end)
    }
  },[props.clickedEvent])

  const hidePopup = () => {
    props.setVisible(false)
    setTitle('')
    setStart(null)
    setEnd(null)
  }

  const handleEventUpdate = async (event) => {
    event.preventDefault()
    /*await eventService.create({
      title,
      start,
      end,
      user: { username: props.user.username }
    })
    const newEvents = await eventService.getUserEvents(props.user.calendarId)
    props.setEvents(newEvents)*/
    hidePopup()
  }

  return (
    <Modal size='sm' show={props.visible} onHide={hidePopup}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Create event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleEventUpdate}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={title} 
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Start</Form.Label>
              <br/>
              <DateTimePicker onChange={(date) => setStart(date)} value={start} />
            </Form.Group>

            <Form.Group>
              <Form.Label>End</Form.Label>
              <br/>
              <DateTimePicker onChange={(date) => setEnd(date)} value={end} />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  )
}

export default EventModifyForm