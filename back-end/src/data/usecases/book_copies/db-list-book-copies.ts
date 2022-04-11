import { BookCopyModel } from '../../../domain/models/book_copy'
import { ListBookCopies } from '../../../domain/usecases/book_copies/list-book-copies'
import { ListBookCopiesRepository } from '../../protocols/book_copies/load-book-copies.repository'

export class DbListBookCopies implements ListBookCopies {
  constructor (private readonly _listBookCopiesRepository: ListBookCopiesRepository) { }

  async list (book_code: any): Promise<BookCopyModel[]> {

    const book_code_prefix = book_code.split("-")[0]
    const books = await this._listBookCopiesRepository.listAllByBookCode(book_code_prefix)
    return books
  }
}
