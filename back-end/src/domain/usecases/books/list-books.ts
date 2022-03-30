import { BookModel } from '../../models/book'

export interface ListBooks {
  list: (params: any) => Promise<BookModel[]>
}
