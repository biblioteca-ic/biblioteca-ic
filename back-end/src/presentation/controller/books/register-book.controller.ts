import { RegisterBook } from '../../../domain/usecases/books/register-book'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'
import { BookCodeGenerator } from '../../../domain/usecases/books/book-code-generator'

export class RegisterBookController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _registerBook: RegisterBook,
    private readonly _bookCodeGenerator: BookCodeGenerator
  ) { }

  async handle (request: RegisterBookController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error.message)
      }
      const { publishedIn, ...rest } = request
      const code = await this._bookCodeGenerator.generate()
      const book = await this._registerBook.add(Object.assign({}, rest, { publishedIn: new Date(publishedIn), code }))
      if (!book) return serverError()
      return created(book)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace RegisterBookController {
  export type Request = {
    title: string
    publishingHouse: string
    publishedIn: Date
    createdBy: string
    authors: string[]
    categories: string[]
  }
}
