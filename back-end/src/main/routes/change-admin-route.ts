import { Router } from 'express'
import { adminAuth2 } from '../../infra/middlewares/admin-auth2'
import { makeChangeAdminController } from '../factories/make-change-admin-controller'

export default (router: Router): void => {
  router.patch('/users/:id/admin', adminAuth2, async (req, res) => makeChangeAdminController(req, res))
}
