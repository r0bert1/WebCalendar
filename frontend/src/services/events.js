import axios from 'axios'
const baseUrl = '/api/events'

const getUserEvents = async calendarId => {
  const response = await axios.get(`${baseUrl}/${calendarId}`)
  return response.data
}

const create = async info => {
  const response = await axios.post(baseUrl, info)
  return response.data
}

export default { create, getUserEvents }