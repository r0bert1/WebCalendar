const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { body } = request;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'invalid username or password'
    });
  }

  response
    .status(200)
    .send({ username: user.username, calendarId: user.calendarId });
});

module.exports = loginRouter;
