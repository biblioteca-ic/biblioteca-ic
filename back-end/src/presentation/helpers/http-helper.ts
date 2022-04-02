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
  body: {},
  message
})

export const badRequest = (message: string): HttpResponse => ({
  statusCode: 400,
  body: {},
  message
})

export const unauthorized = (message?: string): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
  message: message || 'You need to authenticate'
})

export const forbidden = (error: any): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const serverError = (message?: string): HttpResponse => ({
  statusCode: 500,
  body: {},
  message
})

export const notFound = (message?: string): HttpResponse => ({
  statusCode: 404,
  body: {},
  message
})
