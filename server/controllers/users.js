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
    
    const user = await User.find({})
    if (user) {
      return response.status(400).send({
        error: 'username already in use'
      })
    }

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

module.exports = usersRouter