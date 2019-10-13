var {google} = require('googleapis');

var key = require('../service_account_key.json');

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
]

var auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES
);

const api = google.calendar({version : "v3", auth : auth});

module.exports = api