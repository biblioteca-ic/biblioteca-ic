import { BookModel } from '../../models/book'

export interface ListBooks {
  list: () => Promise<BookModel[]>
}
