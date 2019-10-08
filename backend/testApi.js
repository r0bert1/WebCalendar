const api = require('./utils/calendarSetup')

api.calendarList.list({}, (err, res) => {
  if (err) return console.log('The API returned an error: ' + err);
  const calendars = res.data.items
  calendars.forEach((calendar) => {
    console.log(calendar.id)
  })
})