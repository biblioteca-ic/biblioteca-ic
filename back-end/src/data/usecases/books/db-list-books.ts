import { BookModel } from '../../../domain/models/book'
import { ListBooks } from '../../../domain/usecases/books/list-books'
import { ListBooksRepository } from '../../protocols/books/list-books.repository'

export class DbListBooks implements ListBooks {
  constructor (private readonly _listBooksRepository: ListBooksRepository) { }

  async list (params: any): Promise<BookModel[]> {
    const books = await this._listBooksRepository.listAll(params)
    return books
  }
}
