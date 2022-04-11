import { ListBookCopies } from '../../../domain/usecases/book_copies/list-book-copies'
import { notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'

export class ListBookCopiesController implements Controller {
  constructor (
    private readonly _listBookCopies: ListBookCopies
  ) { }

  async handle (request: ListBookCopiesRequest): Promise<HttpResponse> {
    try {
      let { book_code } = request
      const bookCopies = await this._listBookCopies.list(book_code)
      if (!bookCopies || bookCopies.length === 0) return notFound()
      return ok(bookCopies)
    } catch (error) {
      return serverError()
    }
  }
}

export type ListBookCopiesRequest = {
  book_code?: string
}
