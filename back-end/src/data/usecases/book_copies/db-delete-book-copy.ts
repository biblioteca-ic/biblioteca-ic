import { DeleteBookCopy } from '../../../domain/usecases/book_copies/delete-book-copy'

import { DeleteBookCopyRepository } from '../../protocols/book_copies/delete-book-copy.repository'
import { LoadBookCopyByIdRepository } from '../../protocols/book_copies/load-book-copy-by-id.repository'

export class DbDeleteBookCopy implements DeleteBookCopy {
  constructor (
    private readonly _loadBookCopyByIdRepository: LoadBookCopyByIdRepository,
    private readonly _deleteBookCopyRepository: DeleteBookCopyRepository
  ) { }

  async delete (params: DeleteBookCopy.Params): Promise<Boolean> {
    const { book_id } = params
    const bookExists = await this._loadBookCopyByIdRepository.loadById(book_id)

    if (bookExists && String(bookExists.status) === 'AVAILABLE') {
      await this._deleteBookCopyRepository.delete(book_id)

      return true
    }

    return false
  }
}
