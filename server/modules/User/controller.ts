import * as HttpStatus from 'http-status'
import * as _ from 'lodash'
import { Request, Response } from 'express'
import { onError } from '../../api/responses/errorHandler'
import { dbErrorHandler } from '../../config/env/dbErrorHandler'
import { onSuccess } from '../../api/responses/successHandler'
import User from './service'

class UserController {
    private userService: User

    constructor() {
        this.userService = new User()
    }

    getAll(req: Request, res: Response) {
        this.userService
            .getAll()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao buscar os usuários'))
    }

    getById(req: Request, res: Response) {
        const userId = parseInt(req.params.id)
        this.userService
            .getById(userId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao buscar o usuário existente'))
    }


    create(req: Request, res: Response) {
        this.userService
            .create(req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao tentar criar o usuário'))
    }

    update(req: Request, res: Response) {
        const userId = parseInt(req.params.id)
        const userEditado = req.body
        this.userService
            .update(userId, userEditado)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao atualizar o usuário'))
    }

    delete(req: Request, res: Response) {
        const userId = parseInt(req.params.id)
        this.userService
            .delete(userId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao tentar deletar o usuário'))
    }
}
export default UserController 