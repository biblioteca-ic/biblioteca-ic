import { ListBooks } from '../../../domain/usecases/books/list-books'
import { notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'

export class ListBooksController implements Controller {
  constructor (
    private readonly _listBooks: ListBooks
  ) { }

  async handle (request: ListBooksRequest): Promise<HttpResponse> {
    try {
      let { admin, ...params } = request
      const { categories, authors, title, status, ...rest } = params
      if (!admin) {
        params = Object.assign({}, rest, { status: 'AVAILABLE' })
      }
      for (const key in params) {
        if (key === 'categories') {
          params = Object.assign({}, rest, { categories: { hasEvery: categories } })
        }
        if (key === 'authors') {
          params = Object.assign({}, params, { authors: { hasEvery: authors } })
        }
        if (key === 'title') {
          params = Object.assign({}, params, { title: { contains: title } })
        }
      }
      const books = await this._listBooks.list(params)
      return ok(books)
    } catch (error) {
      return serverError(error)
    }
  }
}

export type ListBooksRequest = {
  id?: string
  title?: string
  publishing_house?: string
  authors?: string[]
  categories?: string[]
  created_by?: string
  code?: string
  published_in?: string
  status?: string
  created_at?: Date
  admin: boolean
}
