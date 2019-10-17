import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import DateTime from 'react-datetime'

import './react-datetime.css'

const EventForm = (props) => {
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
            <DateTime />
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