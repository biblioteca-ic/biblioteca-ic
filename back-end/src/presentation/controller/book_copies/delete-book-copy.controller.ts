import { DeleteBookCopy } from '../../../domain/usecases/book_copies/delete-book-copy'
import { badRequest, serverError, noContent } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'

export class DeleteBookCopyController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _deleteBookCopy: DeleteBookCopy
  ) { }

  async handle (request: DeleteBookCopyController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error.message)
      }

      const isDeleted = await this._deleteBookCopy.delete(request)
      if (!isDeleted) return badRequest('Cópia do livro informado não encontrado ou não está disponível para exclusão.')
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}

export namespace DeleteBookCopyController {
  export type Request = {
    book_id: string
  }
}
