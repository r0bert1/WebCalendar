const { google } = require('googleapis')
const { auth } = require('google-auth-library')
const key = require('../../service_account_key.json')

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
]

let client

if (process.env.NODE_ENV === 'production') {
  const keysEnvVar = process.env['CREDS']
  if (!keysEnvVar) {
    throw new Error('The $CREDS environment variable was not found!')
  }
  const keys = JSON.parse(keysEnvVar)
  client = auth.fromJSON(keys)
  client.scopes = SCOPES
} else {
  client = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES
  )
}

const api = google.calendar({version : "v3", auth : client})

module.exports = api