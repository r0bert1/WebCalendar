const eventsRouter = require('express').Router()
const api = require('../utils/calendarSetup')
const moment = require('moment')
const User = require('../models/user')

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
    console.log(event)
    if (event) {
      response
        .status(200)
        .send({ event })
    }
  })
})

module.exports = eventsRouter