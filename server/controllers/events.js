const eventsRouter = require('express').Router();
const moment = require('moment');
const api = require('../utils/calendarSetup');
const User = require('../models/user');

eventsRouter.get('/:calendarId', (request, response) => {
  const { calendarId } = request.params;
  api.events.list(
    {
      calendarId,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const eventsData = res.data.items;
      if (eventsData.length) {
        const events = eventsData.map(event => {
          return {
            id: event.id,
            title: event.summary,
            start: event.start.dateTime,
            end: event.end.dateTime
          };
        });
        return response.status(200).send(events);
      }
      return response.status(204).end();
    }
  );
});

eventsRouter.post('/', async (request, response) => {
  const { body } = request;
  const { title } = body;
  const startDateTime = moment(body.start).format();
  const endDateTime = moment(body.end).format();
  const user = await User.findOne({ username: body.user.username });
  const event = {
    summary: title,
    start: { dateTime: startDateTime },
    end: { dateTime: endDateTime }
  };

  api.events.insert(
    {
      calendarId: user.calendarId,
      resource: event
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      let newEvent = res.data;
      if (newEvent) {
        newEvent = {
          id: newEvent.id,
          title: newEvent.summary,
          start: newEvent.start.dateTime,
          end: newEvent.end.dateTime
        };
        response.status(200).send(newEvent);
      }
    }
  );
});

eventsRouter.put('/:calendarId/:eventId', (request, response) => {
  const { calendarId, eventId } = request.params;
  const { title, start, end } = request.body;

  const updatedEvent = {
    summary: title,
    start: { dateTime: start },
    end: { dateTime: end }
  };

  api.events.update(
    {
      calendarId,
      eventId,
      resource: updatedEvent
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      let event = res.data;
      if (event) {
        event = {
          id: event.id,
          title: event.summary,
          start: event.start.dateTime,
          end: event.end.dateTime
        };
        return response.status(200).send(event);
      }
    }
  );
});

eventsRouter.delete('/:calendarId/:eventId', (request, response) => {
  const { calendarId, eventId } = request.params;

  api.events.delete(
    {
      calendarId,
      eventId
    },
    err => {
      if (err) return console.log(`Error deleting event: ${err}`);
      return response.status(204).end();
    }
  );
});

module.exports = eventsRouter;
