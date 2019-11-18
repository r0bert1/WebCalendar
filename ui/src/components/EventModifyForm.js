import React, { useState, useEffect, } from 'react'
import { Modal, Button, Form, ButtonToolbar } from 'react-bootstrap'
import eventService from '../services/events'
import DateTimePicker from 'react-datetime-picker'

import './DateTimePicker.css'

const EventModifyForm = (props) => {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

  useEffect(() => {
    if (props.clickedEvent) {
      setId(props.clickedEvent.id)
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
    const updatedEvent = await eventService.update(
      props.user.calendarId,
      id,
      { title, start, end }
    )
    const updatedEvents = props.events.map(event =>
      event.id !== id ? event : updatedEvent
    )
    props.setEvents(updatedEvents)
    hidePopup()
  }

  const handleDeletion = async (event) => {
    event.preventDefault()
    await eventService.remove(props.user.calendarId, id)
    const updatedEvents = props.events.filter(event => 
      event.id !== id
    )
    props.setEvents(updatedEvents)
    hidePopup()
  }

  return (
    <Modal size='sm' show={props.visible} onHide={hidePopup}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Edit event</Modal.Title>
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
            <ButtonToolbar>
              <Button variant='primary' type='submit'>
                Save
              </Button>
              <Button className='ml-2' onClick={handleDeletion} variant='danger'>
                Delete
              </Button>
            </ButtonToolbar>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  )
}

export default EventModifyForm