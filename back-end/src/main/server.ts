import { hash } from 'bcrypt'
import express, { NextFunction, Request, Response, Router } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { PrismaHelper } from '../infra/db/prisma-helper'
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

app.post('/create', async (req: Request, res: Response) => {
  const { password, ...userWithoutPassword } = req.body
  const hashedPass = await hash(password, 12)
  const newUser = Object.assign({}, userWithoutPassword, { password: hashedPass })
  const user = PrismaHelper.client.user.create({
    data: newUser
  })
  if (user) {
    return res.send('Usuario criado')
  }
  return res.send('não foi possível')
})

app.listen(3333, () => {
  console.log('listening at http://localhost:3333')
})
