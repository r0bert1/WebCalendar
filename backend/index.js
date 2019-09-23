require('dotenv').config()
const http = require('http')
const app = require('./app')

const server = http.createServer(app)

let PORT = process.env.SERVER_PORT

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})