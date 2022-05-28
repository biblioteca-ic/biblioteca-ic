import { makeListRentedCopiesByUserIdController } from '../../../main/factories/book_copies/make-list-rented-copies-by-user-id-controller'
import { Router } from 'express'
import { auth } from '../../../infra/middlewares/auth'

export default (router: Router): void => {
  router.get('/rented-copies/:userId', auth, async (req, res) => makeListRentedCopiesByUserIdController(req, res))
}
