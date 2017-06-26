import { Request, Response } from "express"
import UserController from '../../modules/user/controller'
let userController

class UserRoutes {

    constructor() {
        userController = new UserController()    
    }
    
    index(req: Request, res: Response) {
        return userController.getAll(req, res)
    }

    create(req: Request, res: Response) {
        return userController.create(req, res)
    }

    findOne(req: Request, res: Response) {
        return userController.getById(req, res)
    }

    update(req: Request, res: Response) {
        return userController.update(req, res)
    }

    destroy(req: Request, res: Response) {
        return userController.delete(req, res)
    }
    
}
export default UserRoutes