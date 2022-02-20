import express, { NextFunction, Request, Response, Router } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swaggerConfig from './docs'
import changeAdminRoute from './routes/change-admin-route'
import changePasswordRoute from './routes/change-password-route'
import editUserRoute from './routes/edit-user-route'
import loginRoute from './routes/login-route'

const app = express()

export const cors = (_: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-headers', '*')
  res.set('access-control-allow-methods', '*')
  next()
}

app.use('/api-docs', serve, setup(swaggerConfig))

app.use(express.json())
app.use(cors)

const router = Router()
app.use('/api', router)
loginRoute(router)
editUserRoute(router)
changePasswordRoute(router)
changeAdminRoute(router)

app.listen(3333, () => {
  console.log('listening at http://localhost:3333')
})
