const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const api = require('../utils/calendarSetup')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  api.events.list({
    calendarId: user.calendarId,
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
            title: event.summary, 
            start: event.start.dateTime, 
            end: event.start.dateTime 
          }
        )
      })
      response
        .status(200)
        .send({ username: user.username, calendarId: user.calendarId, events })
    } else {
      console.log('No upcoming events found.')
    }
  })
})

module.exports = loginRouter