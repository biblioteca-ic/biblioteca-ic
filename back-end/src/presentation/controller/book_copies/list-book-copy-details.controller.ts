import { ListBookCopyDetails } from '../../../domain/usecases/book_copies/list-book-copy-details'
import { notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'

export class ListBookCopyDetailsController implements Controller {
  constructor (
    private readonly _listBookCopyDetails: ListBookCopyDetails
  ) { }

  async handle (request: ListBookCopyDetailsRequest): Promise<HttpResponse> {
    try {
      let { book_copy_id } = request
      const bookCopies = await this._listBookCopyDetails.list(book_copy_id)
      if (!bookCopies) return notFound()
      return ok(bookCopies)
    } catch (error) {
      return serverError()
    }
  }
}

export type ListBookCopyDetailsRequest = {
  book_copy_id?: string
}
