import { CreateBookRepository } from '../../data/protocols/books/create-book.repository'
import { LoadBookByIdRepository } from '../../data/protocols/books/load-book-by-id.repository'
import { BookCode, FindLastBookCodeInsertedRepository } from '../../data/protocols/books/find-last-book-code-inserted.repository'
import { ListBooksRepository } from '../../data/protocols/books/list-books.repository'
import { BookModel, BookModelDto } from '../../domain/models/book'
import { PrismaHelper } from './prisma-helper'
import { LoadBookByCodeRepository } from '../../data/protocols/books/load-book-by-code.repository'
import { DeleteBookAndCopiesRepository } from '../../data/protocols/books/delete-book-and-copies.repository'
import { UpdateBookRepository } from '../../data/protocols/books/update-book.repository'

export class BookPrismaRepository implements CreateBookRepository, FindLastBookCodeInsertedRepository, LoadBookByIdRepository, LoadBookByCodeRepository, ListBooksRepository, DeleteBookAndCopiesRepository, UpdateBookRepository {
  async create (data: any): Promise<BookModel> {
    const mappedBook = PrismaHelper.bookDbMapper(data)
    const book = await PrismaHelper.client.book.create({
      data: mappedBook
    })
    return book && PrismaHelper.bookMapper(book)
  }

  async find (): Promise<BookCode[]> {
    const bookCode = await PrismaHelper.client.book.findMany({
      orderBy: {
        created_at: 'desc'
      },
      take: 1
    })
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
    const books = await PrismaHelper.client.viewBooks.findMany({ where: params })
    return books && PrismaHelper.booksDtoMapper(books)
  }

  async delete (bookId: string): Promise<BookModelDto> {
    const [_, book] = await PrismaHelper.client.$transaction([
      PrismaHelper.client.book_Copy.deleteMany({
        where: {
          book_id: bookId
        }
      }),
      PrismaHelper.client.book.delete({
        where: {
          id: bookId
        }
      })
    ])
    return book && PrismaHelper.bookDtoMapper(book)
  }

  async update (id: string, params: any): Promise<BookModelDto> {
    const { publishingHouse, publishedIn, ...rest } = params
    const newParams = Object.assign({}, rest, { publishing_house: publishingHouse, published_in: new Date(publishedIn) })
    const updatedBook = await PrismaHelper.client.book.update({ data: newParams, where: { id } })
    return updatedBook && PrismaHelper.bookDtoMapper(updatedBook)
  }
}
