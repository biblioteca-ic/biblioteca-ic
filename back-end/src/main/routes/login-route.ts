import { Router } from 'express'
import { makeLoginController } from '../factories/make-login-controller'

export default (router: Router): void => {
  router.post('/login', async (req, res) => makeLoginController(req, res))
}
