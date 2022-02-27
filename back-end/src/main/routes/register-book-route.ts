import { Router } from 'express'
import { adminAuth } from '../../infra/middlewares/admin-auth'
import { makeRegisterBookController } from '../factories/books/make-register-book-controller'

export default (router: Router): void => {
  router.post('/books', adminAuth, async (req, res) => makeRegisterBookController(req, res))
}
