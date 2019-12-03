const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const api = require('../utils/calendarSetup')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, password, confirmPw } = request.body

    if (!password || password.length < 3 ) {
      return response.status(400).send({
        error: 'password minimum length 3'
      })
    }

    if (password != confirmPw) {
      return response.status(400).send({
        error: 'passwords do not match'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    api.calendars.insert({
      requestBody: {
        summary: username
      }
    }, async (err, res) => {
      if (err) return console.log('The API returned an error: ' + err)
      const calendar = res.data
      if (calendar) {
        const calendarId = calendar.id
        const user = new User({
          username,
          passwordHash,
          calendarId
        })
        await user.save()
        response.send(user)
      } else {
        console.log('No calendar created')
      }
    })
  } catch (exception) {
    next(exception)
  }
})

usersRouter.delete('/:calendarId', async (request, response) => {
  const calendarId = request.params.calendarId

  await User.deleteOne({ calendarId: calendarId})

  api.calendars.delete({
    calendarId: calendarId
  }, (err, res) => {
    if (err) return console.log('Error deleting calendar: ' + err)
    response
      .status(204)
      .end()
  })
})

module.exports = usersRouter