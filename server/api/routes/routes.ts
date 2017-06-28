import { Application, Request, Response} from 'express'
import UserRoutes from '../../modules/User/routes'
import TokenRoutes from '../../modules/auth/auth'

export default class Routes {

    private userRoutes: UserRoutes
    private tokenRoute
    private auth
    
    constructor (app: Application, auth: any) {
        this.userRoutes = new UserRoutes()
        this.tokenRoute = new TokenRoutes()
        this.auth = auth
        this.getRoutes(app)
    }
    
    getRoutes (app: Application): void {
        app.route('/api/users/all').all(this.auth.authenticate()).get(this.userRoutes.index)
        app.route('/api/users/create').all(this.auth.authenticate()).post(this.userRoutes.create)
        app.route('/api/users/:id').all(this.auth.authenticate()).get(this.userRoutes.findOne)
        app.route('/api/users/:id/update').all(this.auth.authenticate()).put(this.userRoutes.update)
        app.route('/api/users/:id/delete').all(this.auth.authenticate()).delete(this.userRoutes.destroy)
        app.route('/token').post(this.tokenRoute.auth)
    }
}

