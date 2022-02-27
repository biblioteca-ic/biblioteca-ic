import { BookModel } from '../../../domain/models/book'

export interface CreateBookRepository {
  create: (data: CreateBookRepository.Params) => Promise<BookModel>
}

export namespace CreateBookRepository {
  export type Params = {
    title: string
    authors: string[]
    publishingHouse: string
    createdBy: string
    publishedIn: Date
    categories: string[]
    code: string
  }
}
