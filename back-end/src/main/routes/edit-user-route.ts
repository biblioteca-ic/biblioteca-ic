import { Router } from 'express'
import { identityAuth } from '../../infra/middlewares/identity-auth'
import { makeEditUserController } from '../factories/make-edit-user-controller'

export default (router: Router): void => {
  router.patch('/users/:id', identityAuth, async (req, res) => makeEditUserController(req, res))
}
