import { Application, Request, Response} from 'express'
import UserRoutes from '../../modules/user/routes'

export default class Routes {

    private userRoutes: UserRoutes

    constructor (app: Application) {
        this.userRoutes = new UserRoutes()
        this.getRoutes(app)
    }
    
    getRoutes (app: Application): void {
        app.route('/api/users/all').get(this.userRoutes.index)
        app.route('/api/users/create').post(this.userRoutes.create)
        app.route('/api/users/:id').get(this.userRoutes.findOne)
        app.route('/api/users/:id/update').put(this.userRoutes.update)
        app.route('/api/users/:id/delete').delete(this.userRoutes.destroy)
    }
}

