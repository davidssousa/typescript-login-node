import { Application, Request, Response} from 'express'

export default class Routes {
    constructor (app: Application) {
        this.getRoutes(app)
    }
    getRoutes (app: Application): void {
        app.route('/').get((req: Request, res: Response) => res.send('Hello Word'))
        app.route('/ola/:nome').get((req: Request, res: Response) => res.send(`Hello ${req.params.nome}`))
    }
}

