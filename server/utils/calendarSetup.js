const { google } = require('googleapis');
const { auth } = require('google-auth-library');

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
];

let client;
let key;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  key = require('../../service_account_key.json');
  client = new google.auth.JWT(key.client_email, null, key.private_key, SCOPES);
} else {
  const keyEnvVar = process.env.CREDS;
  if (!keyEnvVar) {
    throw new Error('The $CREDS environment variable was not found!');
  }
  key = JSON.parse(keyEnvVar);
  client = auth.fromJSON(key);
  client.scopes = SCOPES;
}

const api = google.calendar({ version: 'v3', auth: client });

module.exports = api;
