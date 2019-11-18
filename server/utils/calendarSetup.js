var { google } = require('googleapis')

//var key = require('../../service_account_key.json')

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
]
/*
var auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES
)*/

const {auth} = require('google-auth-library');

// load the environment variable with our keys
const keysEnvVar = process.env['CREDS'];
//console.log(process.env['CREDS']) 
if (!keysEnvVar) {
  throw new Error('The $CREDS environment variable was not found!');
}
const keys = JSON.parse(keysEnvVar);


// load the JWT or UserRefreshClient from the keys
const client = auth.fromJSON(keys);
client.scopes = SCOPES;



const api = google.calendar({version : "v3", auth : client})



module.exports = api