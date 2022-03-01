import { BookModel } from '../../../domain/models/book'

export interface ListBooksRepository {
  listAll: () => Promise<BookModel[]>
}
