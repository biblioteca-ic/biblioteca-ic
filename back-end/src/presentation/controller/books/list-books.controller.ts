import { ListBooks } from '../../../domain/usecases/books/list-books'
import { notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'

export class ListBooksController implements Controller {
  constructor (
    private readonly _listBooks: ListBooks
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const books = await this._listBooks.list()
      if (!books || books.length === 0) return notFound()
      return ok(books)
    } catch (error) {
      serverError(error)
    }
  }
}
