const testingRouter = require('express').Router()
const api = require('../utils/calendarSetup')

testingRouter.post('/reset/:calendarId', (request, response) => {
  const calendarId = request.params.calendarId

  api.events.list({
    calendarId: calendarId
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    const eventsData = res.data.items
      eventsData.forEach(event => {
        api.events.delete({
          calendarId: calendarId,
          eventId: event.id
        }, (err, res) => {
          if (err) return console.log('Error deleting event: ' + err)
        })
      })
      response
        .status(204)
        .end()
  })
})

module.exports = testingRouter