import { BookModelDto } from '../../../domain/models/book'
import { UpdateBook, UpdateBookParams } from '../../../domain/usecases/books/update-book'
import { LoadBookByIdRepository } from '../../protocols/books/load-book-by-id.repository'
import { UpdateBookRepository } from '../../protocols/books/update-book.repository'

export class DbUpdateBook implements UpdateBook {
  constructor (
    private readonly _loadBookByIdRepository: LoadBookByIdRepository,
    private readonly _updateBookRepository: UpdateBookRepository
  ) { }

  async update (params: UpdateBookParams): Promise<BookModelDto> {
    const { id, ...rest } = params
    const book = await this._loadBookByIdRepository.loadById(id)
    if (book) {
      const updatedBook = await this._updateBookRepository.update(id, rest)
      return updatedBook
    }
    return null
  }
}
