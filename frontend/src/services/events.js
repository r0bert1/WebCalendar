import axios from 'axios'
const baseUrl = '/api/events'

const getAll = async calendarId => {
  const response = await axios.get(`${baseUrl}/${calendarId}`)
  return response.data
}

const create = async info => {
  const response = await axios.post(baseUrl, info)
  return response.data
}

const remove = async (calendarId, eventId) => {
  const response = await axios.delete(`${baseUrl}/${calendarId}/${eventId}`)
  return response.data
}

export default { create, getAll, remove }