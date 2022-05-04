import { BookCopyModel } from '../../../domain/models/book_copy'
import { ListBookCopyDetails } from '../../../domain/usecases/book_copies/list-book-copy-details'
import { LoadBookCopyByIdRepository } from '../../protocols/book_copies/load-book-copy-by-id.repository'

export class DbListBookCopyDetails implements ListBookCopyDetails {
  constructor (private readonly _listBookCopiesRepository: LoadBookCopyByIdRepository) { }

  async list (book_copy_id: any): Promise<BookCopyModel> {

    const book_copy = await this._listBookCopiesRepository.loadById(book_copy_id)

    return book_copy
  }
}
