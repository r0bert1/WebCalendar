import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import eventService from '../services/events';

import './DateTimePicker.css';

const EventCreateForm = ({
  clickedDate,
  visible,
  setVisible,
  user,
  events,
  setEvents
}) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    setStart(clickedDate);
    setEnd(clickedDate);
  }, [clickedDate]);

  const hidePopup = () => {
    setVisible(false);
    setTitle('');
    setStart(null);
    setEnd(null);
  };

  const handleNewEvent = async event => {
    event.preventDefault();
    const newEvent = await eventService.create({
      title,
      start,
      end,
      user: { username: user.username }
    });
    const newEvents = events.concat(newEvent);
    setEvents(newEvents);
    hidePopup();
  };

  return (
    <Modal size="sm" show={visible} onHide={hidePopup} centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Create event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleNewEvent}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                data-cy="title"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Start</Form.Label>
              <br />
              <DateTimePicker
                onChange={date => setStart(date)}
                value={start}
                disableClock
                locale="fi"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>End</Form.Label>
              <br />
              <DateTimePicker
                onChange={date => setEnd(date)}
                value={end}
                disableClock
                locale="fi"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};

export default EventCreateForm;
