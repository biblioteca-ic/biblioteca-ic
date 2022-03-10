import { Router } from 'express'
import { adminAuth } from '../../infra/middlewares/admin-auth'
import { makeCreateUserController } from '../factories/make-create-user-controller'

export default (router: Router): void => {
  router.post('/users', adminAuth, async (req, res) => makeCreateUserController(req, res))
}
