import { Router } from 'express'
import { auth } from '../../infra/middlewares/auth'
import { makeListBooksController } from '../factories/books/make-list-books-controller'

export default (router: Router): void => {
  router.get('/books', auth, async (req, res) => makeListBooksController(req, res))
}
