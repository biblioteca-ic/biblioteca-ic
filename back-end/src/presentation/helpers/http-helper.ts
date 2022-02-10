import { UnauthorizedError } from '../errors/unauthorized'
import { HttpResponse } from '../protocols/http-response'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (message?: string): HttpResponse => ({
  statusCode: 500,
  body: message
})
