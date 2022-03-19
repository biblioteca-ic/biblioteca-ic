import { UnauthorizedError } from '../errors/unauthorized'
import { HttpResponse } from '../protocols/http-response'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const created = (body: any): HttpResponse => ({
  statusCode: 201,
  body
})

export const noContent = (message?: string): HttpResponse => ({
  statusCode: 204,
  body: {
    statusCode: 204,
    message
  }
})

export const badRequest = (message: string): HttpResponse => ({
  statusCode: 400,
  body: message
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error: any): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: {
    statusCode: 404,
    message: 'Not Found'
  }
})

export const serverError = (message?: string): HttpResponse => ({
  statusCode: 500,
  body: message
})
