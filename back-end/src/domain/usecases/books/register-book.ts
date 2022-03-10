import { BookModel } from '../../models/book'

export interface RegisterBook {
  add: (params: RegisterBook.Params) => Promise<BookModel>
}

export namespace RegisterBook {
  export type Params = {
    title: string
    publishingHouse: string
    authors: string[]
    categories: string[]
    createdBy: string
    code: string
    publishedIn: Date
  }
}
