import { DeleteBook } from '../../../domain/usecases/books/delete-book'
import { badRequest, noContent, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'

export class DeleteBookController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _deleteBook: DeleteBook
  ) { }

  async handle (request: DeleteBookControllerRequest): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) return badRequest(error.message)
      const { id } = request
      const deletedBook = await this._deleteBook.delete(id)
      if (!deletedBook) return badRequest('O livro informado não foi encontrado ou não está disponível para exclusão.')
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}

export type DeleteBookControllerRequest = {
  id: string
}
