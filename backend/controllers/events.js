const eventsRouter = require('express').Router()
const api = require('../utils/calendarSetup')
const moment = require('moment')
const User = require('../models/user')

eventsRouter.post('/', async (request, response) => {
  const time = request.body.time
  const user = await User.findOne({ username: request.body.user.username })

  const startDateTime = moment(new Date(
    time.start.year,
    time.start.month,
    time.start.day,
    time.start.hours,
    time.start.minutes
  )).format()

  const endDateTime = moment(new Date(
    time.end.year,
    time.end.month,
    time.end.day,
    time.end.hours,
    time.end.minutes
  )).format()

  const event = {
    summary: 'test',
    start: { dateTime: startDateTime },
    end: { dateTime: endDateTime }
  }

  console.log(startDateTime)
  console.log(endDateTime)

  api.events.insert({
    calendarId: user.calendarId,
    resource: event
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    response
      .status(200)
      .send({ username: user.username, calendarId: user.calendarId, event })
  })
})

module.exports = eventsRouter