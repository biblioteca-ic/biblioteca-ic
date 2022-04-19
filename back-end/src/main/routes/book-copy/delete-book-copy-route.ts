import { Router } from 'express'
import { adminAuth } from '../../../infra/middlewares/admin-auth'
import { makeDeleteBookCopyController } from '../../factories/book_copies/make-delete-book-copy-controller'

export default (router: Router): void => {
  router.delete('/book-copy/:book_id', adminAuth, async (req, res) => makeDeleteBookCopyController(req, res))
}
