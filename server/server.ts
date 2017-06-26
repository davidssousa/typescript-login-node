import * as http from 'http'
import api from './api/api'

const config = require('./config/config')()
const server = http.createServer(api)

server.listen(config.port)
server.on('listening', () => console.log(`Servidor escutando na porta: ${config.port}`))
server.on('error', (error: NodeJS.ErrnoException) => console.log(`Ocorreu um erro: ${config.port}`))