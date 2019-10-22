import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import eventService from '../services/events'
import DateTime from 'react-datetime'

import './react-datetime.css'

const EventForm = (props) => {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  const handleSubmit = async (event) => {
    event.preventDefault()
    await eventService.create({
      title,
      start,
      end,
      user: { username: props.user.username }
    })
    const newEvents = await eventService.getUserEvents(props.user.calendarId)
    props.setEvents(newEvents)
    props.setVisible(false)
  }

  return (
    <Modal show={props.visible} onHide={() => props.setVisible(false)}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Create event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
              <DateTime onChange={(date) => setStart( date._d )} value={start} />
            </Form.Group>

            <Form.Group>
              <Form.Label>End</Form.Label>
              <DateTime onChange={(date) => setEnd( date._d )} value={end} />
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

export default EventForm