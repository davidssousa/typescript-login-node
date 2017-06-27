import { testDouble, expect } from './config/helpers'
import User from '../../server/modules/User/service'

let _id

describe('Testes de Unidade do Controller', () => {
    describe('Metodo Create', () => {
        it('Deve criar um novo Usuario', () => {
            const novoUsuario = {
                name: 'Novo Usuario',
                email: 'novousuario@email.com',
                password: '1234'
            }
            const user = new User()
            return user.create(novoUsuario).then(data => {
                expect(data.dataValues).to.have.all.keys(
                    ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
                )
                _id = data[0].id
                console.log(data[0].id)
            })
        });
    });

    describe('Metodo getById', () => {
        it('Deve retornar um unico Usuarios pelo seu Id', () => {
            const user = new User()
            return user.getById(_id).then(data => {                
                expect(data[0].name).to.be.equal('Novo Usuario')
                expect(data[0]).to.have.all.keys(
                    ['email', 'id', 'name', 'password']
                ) 
            })
        });
    });

    describe('Metodo Get Users', () => {
        it('Deve retornar um lista com todos os Usuarios', () => {
            const user = new User()
            return user.getAll().then(data => {
                expect(data).to.be.an('array')
                expect(data[0]).to.have.all.keys(
                    ['email', 'id', 'name', 'password']
                ) 
            })
        });
    });

    describe('Metodo Update', () => {
        it('Deve atualizar um Usuario', () => {
            const usuarioAtualizado = {
                name: 'Nome Atualizado',
                email: 'atualizado@email.com',
            }
            const user = new User()
            return user.update(1, usuarioAtualizado).then(data => {
                expect(data[0]).to.be.equal(1)
            })
        });
    });


    describe('Metodo Delete', () => {
        it('Deve atualizar um Usuario', () => {
            const user = new User()
            return user.delete(1).then(data => {
                expect(data).to.be.equal(1)
            })
        });
    });

    
})