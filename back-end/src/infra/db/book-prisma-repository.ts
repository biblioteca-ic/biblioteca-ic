import { CreateBookRepository } from '../../data/protocols/books/create-book.repository'
import { LoadBookByIdRepository } from '../../data/protocols/books/load-book-by-id.repository'
import { BookCode, FindLastBookCodeInsertedRepository } from '../../data/protocols/books/find-last-book-code-inserted.repository'
import { ListBooksRepository } from '../../data/protocols/books/list-books.repository'
import { BookModel, BookModelDto } from '../../domain/models/book'
import { PrismaHelper } from './prisma-helper'
import { LoadBookByCodeRepository } from '@/data/protocols/books/load-book-by-code.repository'

export class BookPrismaRepository implements CreateBookRepository, FindLastBookCodeInsertedRepository, LoadBookByIdRepository, LoadBookByCodeRepository, ListBooksRepository {
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

  async loadById (id: string): Promise<BookModel> {
    const book = await PrismaHelper.client.book.findFirst({ where: { id } })
    return book && PrismaHelper.bookMapper(book)
  }

  async loadByCode (book_code: string): Promise<BookModel> {
    const book = await PrismaHelper.client.book.findFirst({
      where: {
        code: book_code
      }
    })
    return book && PrismaHelper.bookMapper(book)
  }

  async listAll (params: any): Promise<BookModelDto[]> {
    const books = await PrismaHelper.client.viewBooks.findMany({
      where: params
    })
    return books && PrismaHelper.booksDtoMapper(books)
  }
}
