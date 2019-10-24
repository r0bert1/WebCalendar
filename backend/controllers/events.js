const eventsRouter = require('express').Router()
const api = require('../utils/calendarSetup')
const moment = require('moment')
const User = require('../models/user')

eventsRouter.get('/:calendarId', async (request, response) => {
  const calendarId = request.params.calendarId

  api.events.list({
    calendarId: calendarId,
    timeMin: (new Date()).toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    const eventsData = res.data.items
    if (eventsData.length) {
      const events = eventsData.map(event => {
        return (
          { 
            id: event.id,
            title: event.summary, 
            start: event.start.dateTime, 
            end: event.start.dateTime
          }
        )
      })
      response
        .status(200)
        .send({ events })
    } else {
      console.log('No upcoming events found.')
    }
  })
})

eventsRouter.post('/', async (request, response) => {
  const body = request.body
  const title = body.title
  const startDateTime = moment(body.start).format()
  const endDateTime = moment(body.end).format()
  const user = await User.findOne({ username: body.user.username })

  const event = {
    summary: title,
    start: { dateTime: startDateTime },
    end: { dateTime: endDateTime }
  }

  api.events.insert({
    calendarId: user.calendarId,
    resource: event
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    const event = res.data
    if (event) {
      response
        .status(200)
        .send({ event })
    }
  })
})

eventsRouter.delete('/:calendarId/:eventId', async (request, response) => {
  const calendarId = request.params.calendarId
  const eventId = request.params.eventId

  api.events.delete({
    calendarId: calendarId,
    eventId: eventId
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    response
      .status(204)
      .end()
  })
})

module.exports = eventsRouter