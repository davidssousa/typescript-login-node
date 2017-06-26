import { Request, Response } from 'express'

class UserController {
    constructor () {}

    getAll(req: Request, res: Response) {
        return res.status(200).json({
            message: 'OK'
        })
    }
    
    getById(req: Request, res: Response) {
        return res.status(200).json({
            message: 'OK'
        })
    }

    
    create(req: Request, res: Response) {
        return res.status(200).json({
            message: 'OK'
        })
    }

    update(req: Request, res: Response) {
        res.status(200).json({
            message: 'OK'
        })
    }

    delete(req: Request, res: Response) {
        res.status(200).json({
            message: 'OK'
        })
    }
}
export default UserController 