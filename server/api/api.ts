import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import { errorHandlerApi } from "./errorHandlerApi";
import Routes from './routes/routes'
import AuthConfig from '../auth'

class Api {
    public app: express.Application
    public auth

    constructor () {
        this.app = express()
        this.auth = AuthConfig()
        this.middleware()
    }

    middleware (): void {
        this.app.set('port', process.env.PORT || 3000)
        this.app.use(morgan('dev'))
        this.app.use(bodyParser.urlencoded({ extended:true }))
        this.app.use(bodyParser.json())
        this.app.use(errorHandlerApi)
        this.app.use(this.auth.initialize())
        this.router(this.app, this.auth)

    }
    private router (app: express.Application, auth: any): void {
        new Routes(app, auth)
    }
}

export default new Api().app
