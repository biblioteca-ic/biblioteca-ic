import { Router } from 'express'
import { identityAuth } from '../../infra/middlewares/identity-auth'
import { makeCreateUserController } from '../factories/make-create-user-controller'

export default (router: Router): void => {
  router.post('/users', identityAuth, async (req, res) => makeCreateUserController(req, res))
}
