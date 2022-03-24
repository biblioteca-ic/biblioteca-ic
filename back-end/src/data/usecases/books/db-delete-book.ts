import { BookModelDto } from '../../../domain/models/book'
import { DeleteBook } from '../../../domain/usecases/books/delete-book'
import { DeleteBookAndCopiesRepository } from '../../protocols/books/delete-book-and-copies.repository'
import { LoadRentedCopiesByBookIdRepository } from '../../protocols/book_copies/load-rented-copies-by-book-id.repository'

export class DbDeleteBook implements DeleteBook {
  constructor (
    private readonly _loadRentedCopiesByBookIdRepository: LoadRentedCopiesByBookIdRepository,
    private readonly _deleteBookAndCopiesRepository: DeleteBookAndCopiesRepository
  ) { }

  async delete (id: string): Promise<BookModelDto> {
    const rentedCopies = await this._loadRentedCopiesByBookIdRepository.loadByBookId(id)
    if (rentedCopies.length === 0) {
      const book = await this._deleteBookAndCopiesRepository.delete(id)
      return book
    }
    return null
  }
}
