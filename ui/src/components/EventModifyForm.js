import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ButtonToolbar } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import eventService from '../services/events';

import './DateTimePicker.css';

const EventModifyForm = ({
  clickedEvent,
  visible,
  setVisible,
  events,
  setEvents,
  user
}) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    if (clickedEvent) {
      setId(clickedEvent.id);
      setTitle(clickedEvent.title);
      setStart(clickedEvent.start);
      setEnd(clickedEvent.end);
    }
  }, [clickedEvent]);

  const hidePopup = () => {
    setVisible(false);
    setTitle('');
    setStart(null);
    setEnd(null);
  };

  const handleEventUpdate = async event => {
    event.preventDefault();
    const updatedEvent = await eventService.update(user.calendarId, id, {
      title,
      start,
      end
    });
    const updatedEvents = events.map(currentEvent =>
      currentEvent.id !== id ? currentEvent : updatedEvent
    );
    setEvents(updatedEvents);
    hidePopup();
  };

  const handleDeletion = async event => {
    event.preventDefault();
    await eventService.remove(user.calendarId, id);
    const updatedEvents = events.filter(element => element.id !== id);
    setEvents(updatedEvents);
    hidePopup();
  };

  return (
    <Modal size="sm" show={visible} onHide={hidePopup} centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Edit event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleEventUpdate}>
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
                locale="fi"
                disableClock
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>End</Form.Label>
              <br />
              <DateTimePicker
                onChange={date => setEnd(date)}
                value={end}
                locale="fi"
                disableClock
              />
            </Form.Group>
            <ButtonToolbar>
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Button
                className="ml-2"
                onClick={handleDeletion}
                variant="danger"
              >
                Delete
              </Button>
            </ButtonToolbar>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};

export default EventModifyForm;
