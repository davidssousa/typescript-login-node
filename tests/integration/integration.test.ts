import * as jwt from 'jwt-simple'
import * as HttpStatus from 'http-status'
import { app, request, expect } from './config/helpers'

describe('Testes de Itegracao', () => {
    'use strict'
    const config = require('../../server/config/config')()
    const model = require('../../server/models')

    let id
    let token

    const userTest = {
        id: 100,
        name: 'test',
        email: 'test@email.com',
        password: 'test'
    }

    const userDefault = {
        id: 1,
        name: 'default',
        email: 'default@email.com',
        password: 'default'
    }

    beforeEach(done => {
        model
            .User
            .destroy({ where: {} })
            .then(() => {
                return model.User.create(userDefault)
            })
            .then(user => {
                model.User
                    .create(userTest)
                    .then(() => {
                        token = jwt.encode({id: user.id}, config.secret)
                        done()
                    })
            })
    })

    describe ('POST /token', () => {
        it('Deve receber um JWT', done => {
            const credentials = {
                email: userDefault.email,
                password: userDefault.password
            }
            request(app)
                .post('/token')
                .send(credentials)
                .end((error, res) => {
                    expect(res.status).to.equal(HttpStatus.OK)
                    expect(res.body.token).to.equal(`${token}`)
                    done(error)
                })
        });

        it ('Nao deve gerar o Token', done => {
            const credentials = {
                email: 'invalido@email.com',
                password: 'invalidPassword'
            }
            request(app)
                .post('/token')
                .send(credentials)
                .end((error, res) => {
                    expect(res.status).to.equal(HttpStatus.UNAUTHORIZED)
                    expect(res.body).to.empty
                    done(error)
                })
        });
    });

    describe('GET /api/users/all', () => {
        it('Deve retornar um Array com todos os Usuarios', done => {
            request(app)
                .get('/api/users/all')
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HttpStatus.OK)
                    expect(res.body.payload).to.be.an('array')
                    expect(res.body.payload[0].name).to.be.equal(userDefault.name)
                    expect(res.body.payload[0].email).to.be.equal(userDefault.email)
                    done(error)
                });
        });
    })

    describe('POST /api/users/create', () => {
        it('Deve cadastrar um novo Usuario', (done) => {
            const user = {
                id: 2,
                name: 'Usuario Teste',
                email: 'usuario@email.com',
                password: 'novouser'
            }
            request(app)
                .post('/api/users/create')
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .send(user)
                .end((error, res) => {
                    expect(res.status).to.equal(HttpStatus.OK)
                    expect(res.body.payload.id).to.equal(user.id)
                    expect(res.body.payload.name).to.equal(user.name)
                    expect(res.body.payload.email).to.equal(user.email)
                    done(error)
                })
        });
    });

    describe('GET /api/users/:id', () => {
        it('Deve retornar um Array com um unico Usuario', (done) => {
            request(app)
                .get(`/api/users/${userDefault.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HttpStatus.OK)
                    expect(res.body.payload.id).to.equal(userDefault.id)
                    expect(res.body.payload.name).to.equal(userDefault.name)
                    id = res.body.payload.id
                    done(error)
                })
        });
    });

    describe('PUT /api/users/:id/update', () => {
        it('Deve atualizar um Usuario existente', (done) => {
            const userUpdate = {
                id: id,
                name: 'update',
                email: 'update@email.com',
                password: 'update'
            }
            request(app)
                .put(`/api/users/${userUpdate.id}/update`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .send(userUpdate)
                .end((error, res) => {
                    expect(res.status).to.equal(HttpStatus.OK)
                    expect(res.body.payload).to.be.an('array')
                    expect(res.body.payload[0]).to.equal(1)
                    done(error)
                })
        })
    })

    describe('DELETE /api/users/:id/destroy', () => {
        it('Deve deletar um Usuario existente', () => {
            request(app)
                .delete(`/api/users/${userTest.id}/destroy`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HttpStatus.OK)
                    expect(res.body.payload).to.equal(1)
                })
        })
    })
})