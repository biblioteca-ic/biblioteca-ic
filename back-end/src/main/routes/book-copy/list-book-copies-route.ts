import { Router } from 'express'
import { auth } from '../../../infra/middlewares/auth'
import { makeListBookCopiesController } from '../../factories/book_copies/make-list-book-copies-controller'
import { makeListBookCopyDetailsController } from '../../factories/book_copies/make-list-book-copies-details-controller'

export default (router: Router): void => {
  router.get('/book-copy/:book_code', auth, async (req, res) => makeListBookCopiesController(req, res))
  router.get('/book-copy/details/:book_copy_id', auth, async (req, res) => makeListBookCopyDetailsController(req, res))
}
