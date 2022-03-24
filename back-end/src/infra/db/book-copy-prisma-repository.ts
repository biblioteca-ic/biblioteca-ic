import { DeleteBookCopyRepository } from '@/data/protocols/book_copies/delete-book-copy.repository'
import { LoadBookCopyByIdRepository } from '@/data/protocols/book_copies/load-book-copy-by-id.repository'
import { CreateBookCopyRepository } from '../../data/protocols/book_copies/create-book-copy.repository'
import { BookCopyCode, FindLastBookCopyCodeInsertedRepository } from '../../data/protocols/book_copies/find-last-book-copy-code-inserted.repository'
import { BookCopyModel } from '../../domain/models/book_copy'
import { RentedCopy } from '../../domain/models/rented-copy'
import { PrismaHelper } from './prisma-helper'
import { LoadRentedCopiesByUserIdRepository } from '../../data/protocols/book_copies/load-rented-copies-by-user-id.repository'
import { LoadRentedCopiesByBookIdRepository } from '../../data/protocols/book_copies/load-rented-copies-by-book-id.repository'

export class BookCopyPrismaRepository implements CreateBookCopyRepository, FindLastBookCopyCodeInsertedRepository, LoadBookCopyByIdRepository, DeleteBookCopyRepository, LoadRentedCopiesByUserIdRepository, LoadRentedCopiesByBookIdRepository {
  async create (data: any): Promise<BookCopyModel> {
    const mappedBook = PrismaHelper.bookCopyDbMapper(data)
    const book = await PrismaHelper.client.book_Copy.create({
      data: mappedBook
    })
    return book && PrismaHelper.bookCopyMapper(book)
  }

  async find (prefix: string): Promise<BookCopyCode[]> {
    const bookCode = await PrismaHelper.client.$queryRawUnsafe<BookCopyCode[]>(`SELECT code FROM book_copies WHERE code LIKE '${prefix}%' ORDER BY created_at DESC FETCH FIRST 1 ROWS ONLY;`)
    return bookCode
  }

  async delete (id: string): Promise<void> {
    await PrismaHelper.client.book_Copy.delete({
      where: {
        id
      }
    })
  }

  async loadById (id: string): Promise<BookCopyModel> {
    const bookCopy = await PrismaHelper.client.book_Copy.findFirst({ where: { id } })
    return bookCopy && PrismaHelper.bookCopyMapper(bookCopy)
  }

  async loadByUserId (id: string): Promise<RentedCopy[]> {
    const copies = await PrismaHelper.client.viewRentedCopies.findMany({
      where: {
        user_id: id
      }
    })
    return copies && PrismaHelper.rentedCopiesMapper(copies)
  }

  async loadByBookId (bookId: string): Promise<RentedCopy[]> {
    const copies = await PrismaHelper.client.viewRentedCopies.findMany({
      where: {
        book_id: bookId
      }
    })
    return copies && PrismaHelper.rentedCopiesMapper(copies)
  }
}
