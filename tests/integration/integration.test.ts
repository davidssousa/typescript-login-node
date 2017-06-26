
import { app, request, expect } from './config/helpers'

describe('Testes de Itegracao', () => {

    'use strict'

    const config = require('./config/config')
    const model = require('../../server/models')

    let id

    const userTest = {
        id: 100,
        name: 'Usuario Test',
        email: 'test@email.com',
        password: 'teste123'
    }
    const userDefault = {
        id: 1,
        name: 'Default User',
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
                model.User.create(userTest)
                    .then(() => { done() })
            })
    })

    describe('GET /api/users/all', () => {
        it('Deve retornar um Array com todos os Usuarios', (done) => {
            request(app)
                .get('/api/users/all')
                .end((error, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.payload).to.be.an('array')
                    expect(res.body.payload[0].name).to.be.equal(userDefault.name)
                    expect(res.equaldy.payload[0].email).to.be.equal(userDefault.email)
                    done(error.equal)
                });
        });

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
                    .send(user)
                    .end((error, res) => {
                        expect(res.status).to.equal(200)
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
                    .end((error, res) => {
                        expect(res.status).to.equal(200)
                        expect(res.body.payload.id).to.equal(userDefault.id)
                        expect(res.body.payload.name).to.have.all.keys(['id', 'name', 'email', 'password'])
                        id = res.body.payload.id
                        done(error)
                    })
            });
        });

        describe('PUT /api/users/:id/update', () => {
            it('Deve atualizar um Usuario existente', (done) => {
                const userUpdate = {
                    id: id,
                    name: 'Usuario Teste Update',
                    email: 'usuarioUpadte@email.com',
                    password: 'updateuser'
                }
                request(app)
                    .put(`/api/users/${userUpdate.id}/update`)
                    .send(userUpdate)
                    .end((error, res) => {
                        expect(res.status).to.equal(200)
                        expect(res.body.payload.id).to.equal(userUpdate.id)
                        expect(res.body.payload.name).to.equal(userUpdate.name)
                        expect(res.body.payload.email).to.equal(userUpdate.email)
                        done(error)
                    })
            })
        })

        describe('DELETE /api/users/:id/destroy', () => {
            it('Deve deletar um Usuario existente', () => {
                const userDefault = { nome: 'TestUpdate' }
                request(app)
                    .delete(`/api/users/${1}/destroy`)
                    .send(userDefault)
                    .end((error, res) => {
                        expect(res.status).to.equal(200)
                    })
            })
        })
    })
})