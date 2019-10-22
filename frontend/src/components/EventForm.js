import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'
import eventService from '../services/events'

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
              <DateTimePicker onChange={(date) => setStart( date )} value={start} />
            </Form.Group>

            <Form.Group>
              <Form.Label>End</Form.Label>
              <DateTimePicker onChange={(date) => setEnd( date )} value={end} />
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