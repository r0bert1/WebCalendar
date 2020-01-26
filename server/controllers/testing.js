const testingRouter = require('express').Router();
const api = require('../utils/calendarSetup');

testingRouter.post('/reset/:calendarId', (request, response) => {
  const { calendarId } = request.params;

  api.events.list(
    {
      calendarId
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const eventsData = res.data.items;
      eventsData.forEach(event => {
        api.events.delete(
          {
            calendarId,
            eventId: event.id
          },
          error => {
            if (error) return console.log(`Error deleting event: ${error}`);
          }
        );
      });
      return response.status(204).end();
    }
  );
});

module.exports = testingRouter;
