import cors from 'cors'
import express, { Router } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swaggerConfig from './docs'
import borrowBookCopyRoute from './routes/book-copy/borrow-book-copy-route'
import deleteBookCopyRoute from './routes/book-copy/delete-book-copy-route'
import giveBackBookCopyRoute from './routes/book-copy/give-back-book-copy-route'
import listBookCopiesRoute from './routes/book-copy/list-book-copies-route'
import registerBookCopyRoute from './routes/book-copy/register-book-copy-route'
import changeAdminRoute from './routes/change-admin-route'
import changePasswordRoute from './routes/change-password-route'
import createUserRoute from './routes/create-user-route'
import deleteBookRoute from './routes/delete-book-route'
import deleteUserRoute from './routes/delete-user-route'
import editUserRoute from './routes/edit-user-route'
import listBooksRoute from './routes/list-books-route'
import listUsersRoute from './routes/list-users-route'
import loginRoute from './routes/login-route'
import registerBookRoute from './routes/register-book-route'
import updateBookRoute from './routes/update-book-route'
import listRentedCopiesByUserIdRoute from './routes/book-copy/list-rented-copies-by-user-id-route'
import renewBookCopyRoute from './routes/book-copy/renew-book-copy-route'
import { JobsKernel } from './jobs/jobs-kernel'
const app = express()

app.use(cors())
app.use('/api-docs', serve, setup(swaggerConfig))

app.use(express.json())

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
giveBackBookCopyRoute(router)
listRentedCopiesByUserIdRoute(router)
renewBookCopyRoute(router)

app.listen(3333, () => {
  console.log('listening at http://localhost:3333')
})

const jobsKernel = new JobsKernel()
jobsKernel.setUp()
