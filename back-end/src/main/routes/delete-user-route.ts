import { Router } from 'express'
import { adminOrMySelfAuth } from '../../infra/middlewares/admin-or-myself-auth'
import { makeDeleteUserController } from '../factories/users/make-delete-user-controller'

export default (router: Router): void => {
  router.delete('/users/:id', adminOrMySelfAuth, async (req, res) => makeDeleteUserController(req, res))
}
