import { Router } from 'express'
import { adminAuth } from '../../infra/middlewares/admin-auth'
import { makeRegisterBookCopyController } from '../factories/book_copies/make-register-book-copy-controller'

export default (router: Router): void => {
  router.post('/book-copy', adminAuth, async (req, res) => makeRegisterBookCopyController(req, res))
}
