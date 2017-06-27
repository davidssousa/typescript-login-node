import * as http from 'http'
import api from './api/api'

const models = require('./models')
const config = require('./config/config')()
const server = http.createServer(api)

models.sequelize.sync().then(() => {
    server.listen(api.get('port'))
    server.on('listening', () => console.log(`Servidor escutando na porta: ${api.get('port')}`))
    server.on('error', (error: NodeJS.ErrnoException) => console.log(`Ocorreu um erro: ${config.port}`))
})


