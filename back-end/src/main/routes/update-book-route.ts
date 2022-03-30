import { Router } from 'express'
import { adminAuth } from '../../infra/middlewares/admin-auth'
import { makeUpdateBookController } from '../factories/books/make-update-book-controller'

export default (router: Router): void => {
  router.patch('/books/:id', adminAuth, async (req, res) => makeUpdateBookController(req, res))
}
