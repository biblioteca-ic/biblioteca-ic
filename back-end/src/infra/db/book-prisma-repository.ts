import { CreateBookRepository } from '../../data/protocols/books/create-book.repository'
import { BookCode, FindLastBookCodeInsertedRepository } from '../../data/protocols/books/find-last-book-code-inserted.repository'
import { BookModel } from '../../domain/models/book'
import { PrismaHelper } from './prisma-helper'

export class BookPrismaRepository implements CreateBookRepository, FindLastBookCodeInsertedRepository {
  async create (data: any): Promise<BookModel> {
    const mappedBook = PrismaHelper.bookDbMapper(data)
    const book = await PrismaHelper.client.book.create({
      data: mappedBook
    })
    return book && PrismaHelper.bookMapper(book)
  }

  async find (): Promise<BookCode[]> {
    const bookCode = await PrismaHelper.client.$queryRaw<BookCode[]>`SELECT code FROM books ORDER BY created_at DESC FETCH FIRST 1 ROWS ONLY;`
    return bookCode
  }
}
