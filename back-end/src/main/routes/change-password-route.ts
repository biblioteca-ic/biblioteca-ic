import { Router } from 'express'
import { identityAuth } from '../../infra/middlewares/identity-auth'
import { makeChangePasswordController } from '../factories/users/make-change-password-controller'

export default (router: Router): void => {
  router.patch('/users/:id/password', identityAuth, async (req, res) => makeChangePasswordController(req, res))
}
