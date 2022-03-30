import { UpdateBook } from '../../../domain/usecases/books/update-book'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'

export class UpdateBookController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _updateBook: UpdateBook
  ) { }

  async handle (request: UpdateBookControllerRequest): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) return badRequest(error.message)

      const updatedBook = await this._updateBook.update(request)
      if (!updatedBook) return serverError()
      return ok(updatedBook)
    } catch (error) {
      return serverError()
    }
  }
}

export type UpdateBookControllerRequest = {
  id: string
  title: string
  publishingHouse: string
  publishedIn: Date
  authors: string[]
  categories: string[]
}
