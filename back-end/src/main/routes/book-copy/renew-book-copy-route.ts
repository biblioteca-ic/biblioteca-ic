import { makeGiveBackBookCopyController } from '../../factories/book_copies/make-give-back-book-copy-controller'
import { Router } from 'express'
import { adminAuth } from '../../../infra/middlewares/admin-auth'
import { makeRenewBookCopyController } from '../../../main/factories/book_copies/make-renew-book-copy-controller'

export default (router: Router): void => {
  router.post('/book-copy/renew/:copyId', adminAuth, async (req, res) => makeRenewBookCopyController(req, res))
}
