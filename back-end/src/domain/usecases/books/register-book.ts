import { BookModel } from '../../models/book'

export interface RegisterBook {
  add: (params: RegisterBook.Params) => Promise<BookModel>
}

export namespace RegisterBook {
  export type Params = {
    title: string
    publishingHouse: string
    createdBy: string
    publishedAt: Date
  }
}
