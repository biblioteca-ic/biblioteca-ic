import { BookModel } from '../../../domain/models/book'
import { RegisterBook } from '../../../domain/usecases/books/register-book'
import { CreateBookRepository } from '../../protocols/books/create-book.repository'
import { LoadUserByIdRepository } from '../../protocols/users/load-user-by-id.repository'

export class DbRegisterBook implements RegisterBook {
  constructor (
    private readonly _createBook: CreateBookRepository,
    private readonly _loadUserByIdRepository: LoadUserByIdRepository
  ) { }

  async add (params: RegisterBook.Params): Promise<BookModel|null> {
    const { createdBy } = params
    const user = await this._loadUserByIdRepository.loadById(createdBy)
    if (user?.admin) {
      const book = await this._createBook.create(params)
      return book
    }
    return null
  }
}
