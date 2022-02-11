import express, { NextFunction, Request, Response, Router } from 'express'
import loginRoute from './routes/login-route'
import { serve, setup } from 'swagger-ui-express'
import swaggerConfig from './docs'

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

app.listen(3333, () => {
  console.log('listening at http://localhost:3333')
})
