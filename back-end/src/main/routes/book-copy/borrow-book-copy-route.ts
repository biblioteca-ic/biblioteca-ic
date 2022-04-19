import { adminAuth } from '../../../infra/middlewares/admin-auth'
import { makeBorrowBookCopyController } from '../../../main/factories/book_copies/make-borrow-book-copy-controller'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/book-copy/borrow', adminAuth, async (req, res) => makeBorrowBookCopyController(req, res))
}
