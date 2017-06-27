import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import { errorHandlerApi } from "./errorHandlerApi";
import Routes from './routes/routes'

class Api {
    public app: express.Application
    constructor () {
        this.app = express()
        this.middleware()
    }

    middleware (): void {
        this.app.set('port', process.env.PORT || 3000)
        this.app.use(morgan('dev'))
        this.app.use(bodyParser.urlencoded({ extended:true }))
        this.app.use(bodyParser.json())
        this.app.use(errorHandlerApi)
        this.router(this.app)
    }
    private router (app: express.Application): void {
        new Routes(app)
    }
}

export default new Api().app
