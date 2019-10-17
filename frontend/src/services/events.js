import axios from 'axios'
const baseUrl = '/api/events'

const create = async info => {
  const response = await axios.post(baseUrl, info)
  return response.data
}

export default { create }