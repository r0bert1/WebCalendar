import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'

import './react-datetime.css'

const EventForm = (props) => {
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())


  return (
    <Modal show={props.visible} onHide={() => props.setVisible(false)}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Create event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            Title:
            <input
              type='text'
            />
            <br />
            Start:
            <DateTimePicker onChange={(date) => setStart( date )} value={start}/>
            <br />
            End:
            <DateTimePicker onChange={(date) => setEnd( date )} value={end}/>
            <br />
            <input type='submit' value='Save' />
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