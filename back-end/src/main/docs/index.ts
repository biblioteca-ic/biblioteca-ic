import { deleteBookCopyPath, registerBookCopyPath, listBookCopiesPath, listBookCopyDetailsPath, borrowBookCopyPath, giveBackBookCopyPath } from './paths/book-copy-path'
import { deleteBookPath, listBooksPath, registerBookPath, updateBookPath } from './paths/book-path'
import { changeAdminPath, changePasswordPath, createUserPath, deleteUserPath, editUserPath, listUsersPath, loginPath } from './paths/user-paths'
import { registerBookCopyRequestSchema, registerBookCopyResponseSchema, listBookCopyDetailsResponseSchema, listBookCopiesResponseSchema, borrowBookCopyRequestSchema, borrowBookCopyResponseSchema, giveBackBookCopyRequestSchema, giveBackBookCopyResponseSchema } from './schemas/book-copy-schemas'
import { listBooksResponseSchema, registerBookRequestSchema, registerBookResponseSchema, updateBookRequestSchema, updateBookResponseSchema } from './schemas/book-schemas'
import { changeAdminRequestSchema, changeAdminResponseSchema, changePasswordRequestSchema, changePasswordResponseSchema, createUserRequestSchema, createUserResponseSchema, deleteUserResponseSchema, editUserRequestSchema, editUserResponseSchema, listUsersResponseSchema, loginRequestSchema, loginResponseSchema } from './schemas/user-schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Biblioteca Setorial IC API',
    description: '',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Users'
  }, {
    name: 'Books'
  }, {
    name: 'BookCopy'
  }],
  paths: {
    '/login': loginPath,
    '/users': {
      post: createUserPath,
      get: listUsersPath
    },
    '/users/{id}': {
      patch: editUserPath,
      delete: deleteUserPath
    },
    '/users/{id}/password': changePasswordPath,
    '/users/{id}/admin': changeAdminPath,
    '/books': {
      post: registerBookPath,
      get: listBooksPath
    },
    '/books/{id}': {
      delete: deleteBookPath,
      patch: updateBookPath
    },
    '/book-copy': registerBookCopyPath,
    '/book-copy/{book_id}': deleteBookCopyPath,
    '/book-copy/{book_code}': listBookCopiesPath,
    '/book-copy/details/{book_copy_id}': listBookCopyDetailsPath,
    '/book-copy/borrow': borrowBookCopyPath,
    '/book-copy/give-back': giveBackBookCopyPath
  },
  schemas: {
    loginRequest: loginRequestSchema,
    loginResponse: loginResponseSchema,
    createUserRequest: createUserRequestSchema,
    createUserResponse: createUserResponseSchema,
    listUsersResponse: listUsersResponseSchema,
    editUserRequest: editUserRequestSchema,
    editUserResponse: editUserResponseSchema,
    deleteUserResponse: deleteUserResponseSchema,
    changePasswordRequest: changePasswordRequestSchema,
    changePasswordResponse: changePasswordResponseSchema,
    changeAdminRequest: changeAdminRequestSchema,
    changeAdminResponse: changeAdminResponseSchema,
    registerBookRequest: registerBookRequestSchema,
    registerBookResponse: registerBookResponseSchema,
    updateBookRequest: updateBookRequestSchema,
    updateBookResponse: updateBookResponseSchema,
    listBooksResponse: listBooksResponseSchema,
    registerBookCopyRequest: registerBookCopyRequestSchema,
    registerBookCopyResponse: registerBookCopyResponseSchema,
    listBookCopiesResponse: listBookCopiesResponseSchema,
    listBookCopyDetailsResponse: listBookCopyDetailsResponseSchema,
    borrowBookCopyRequest: borrowBookCopyRequestSchema,
    borrowBookCopyResponse: borrowBookCopyResponseSchema,
    giveBackBookCopyRequest: giveBackBookCopyRequestSchema,
    giveBackBookCopyResponse: giveBackBookCopyResponseSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: {
        type: 'apiKey',
        name: 'x-access-token',
        in: 'header'
      }
    }
  }
}
