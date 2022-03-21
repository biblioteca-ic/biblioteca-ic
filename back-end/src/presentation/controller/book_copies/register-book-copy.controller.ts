import { RegisterBookCopy } from '../../../domain/usecases/book_copies/register-book-copy'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'

export class RegisterBookCopyController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _registerBookCopy: RegisterBookCopy
  ) { }

  async handle (request: RegisterBookController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error.message)
      }

      const copyBook = await this._registerBookCopy.add(request)
      if (!copyBook) return serverError()
      return created(copyBook)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace RegisterBookController {
  export type Request = {
    book_code: string
    created_by: string
  }
}
