import { Router } from 'express'
import { adminAuth } from '../../infra/middlewares/admin-auth'
import { makeListUsersController } from '../factories/users/make-list-users-controller'

export default (router: Router): void => {
  router.get('/users', adminAuth, async (req, res) => makeListUsersController(req, res))
  router.get('/users/:id', adminAuth, async (req, res) => makeListUsersController(req, res))
}
