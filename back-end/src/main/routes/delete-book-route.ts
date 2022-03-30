import { Router } from 'express'
import { adminAuth } from '../../infra/middlewares/admin-auth'
import { makeDeleteBookController } from '../factories/books/make-delete-book-controller'

export default (router: Router): void => {
  router.delete('/books/:id', adminAuth, async (req, res) => makeDeleteBookController(req, res))
}
