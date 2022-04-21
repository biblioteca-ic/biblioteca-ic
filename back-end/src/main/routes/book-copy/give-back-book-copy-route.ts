import { makeGiveBackBookCopyController } from '../../../main/factories/book_copies/make-give-back-book-copy-controller'
import { Router } from 'express'
import { adminAuth } from '../../../infra/middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/book-copy/give-back', adminAuth, async (req, res) => makeGiveBackBookCopyController(req, res))
}
