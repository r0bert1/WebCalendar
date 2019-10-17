import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'
import eventService from '../services/events'

const EventForm = (props) => {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newEvent = await eventService.create({
      title,
      start,
      end,
      user: { username: props.user.username }
    })
    console.log(newEvent)
    const newEvents = props.user.events.concat(newEvent)
    const newUser = {...props.user, events: newEvents}
    props.setUser(newUser)
    props.setVisible(false)
  }

  return (
    <Modal show={props.visible} onHide={() => props.setVisible(false)}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Create event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            Title:
            <input type='text' onChange={(event) => setTitle(event.target.value)} value={title} />
            <br />
            Start:
            <DateTimePicker onChange={(date) => setStart( date )} value={start} />
            <br />
            End:
            <DateTimePicker onChange={(date) => setEnd( date )} value={end} />
            <br />
            <button type="submit">save</button>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default EventForm