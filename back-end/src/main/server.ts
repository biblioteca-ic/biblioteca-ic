import express, { NextFunction, Request, Response, Router } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swaggerConfig from './docs'
import changeAdminRoute from './routes/change-admin-route'
import changePasswordRoute from './routes/change-password-route'
import editUserRoute from './routes/edit-user-route'
import createUserRoute from './routes/create-user-route'
import listBooksRoute from './routes/list-books-route'
import loginRoute from './routes/login-route'
import registerBookRoute from './routes/register-book-route'
import registerBookCopyRoute from './routes/book-copy/register-book-copy-route'
import deleteBookCopyRoute from './routes/book-copy/delete-book-copy-route'
import listUsersRoute from './routes/list-users-route'
import deleteUserRoute from './routes/delete-user-route'
import deleteBookRoute from './routes/delete-book-route'
import updateBookRoute from './routes/update-book-route'
import listBookCopiesRoute from './routes/book-copy/list-book-copies-route'
import borrowBookCopyRoute from './routes/book-copy/borrow-book-copy-route'

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
createUserRoute(router)
listUsersRoute(router)
editUserRoute(router)
deleteUserRoute(router)
changePasswordRoute(router)
changeAdminRoute(router)

registerBookRoute(router)
updateBookRoute(router)
listBooksRoute(router)
deleteBookRoute(router)

deleteBookCopyRoute(router)
registerBookCopyRoute(router)
listBookCopiesRoute(router)
borrowBookCopyRoute(router)

app.listen(3333, () => {
  console.log('listening at http://localhost:3333')
})
