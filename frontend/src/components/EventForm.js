import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'

import './react-datetime.css'

const EventForm = (props) => {
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target.title.value)
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
            <input
              name='title'
              type='text'
            />
            <br />
            Start:
            <DateTimePicker onChange={(date) => setStart( date )} value={start}/>
            <br />
            End:
            <DateTimePicker onChange={(date) => setEnd( date )} value={end}/>
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