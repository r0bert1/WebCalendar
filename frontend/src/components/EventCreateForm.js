import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import eventService from '../services/events'
import DateTimePicker from 'react-datetime-picker'

import './DateTimePicker.css'

const EventCreateForm = (props) => {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  useEffect(() => {
    setStart(props.clickedDate)
    setEnd(props.clickedDate)
  }, [props.clickedDate])

  const hidePopup = () => {
    props.setVisible(false)
    setTitle('')
    setStart(null)
    setEnd(null)
  }

  const handleNewEvent = async (event) => {
    event.preventDefault()
    const newEvent = await eventService.create({
      title,
      start,
      end,
      user: { username: props.user.username }
    })
    const newEvents = props.events.concat(newEvent)
    props.setEvents(newEvents)
    hidePopup()
  }

  return (
    <Modal size='sm' show={props.visible} onHide={hidePopup}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Create event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleNewEvent}>
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
              <DateTimePicker onChange={(date) => setStart( date )} value={start} timeFormat="HH:mm" />
            </Form.Group>

            <Form.Group>
              <Form.Label>End</Form.Label>
              <br/>
              <DateTimePicker onChange={(date) => setEnd( date )} value={end} timeFormat="HH:mm" />
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

export default EventCreateForm