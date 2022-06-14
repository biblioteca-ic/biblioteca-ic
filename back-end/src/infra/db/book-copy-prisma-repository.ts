import { RenewCopyRepository } from '../../data/protocols/book_copies/renew-copy.repository'
import { CopyStatus } from '@prisma/client'
import { BorrowCopyRepository } from '../../data/protocols/book_copies/borrow-copy.repository'
import { CreateBookCopyRepository } from '../../data/protocols/book_copies/create-book-copy.repository'
import { DeleteBookCopyRepository } from '../../data/protocols/book_copies/delete-book-copy.repository'
import { BookCopyCode, FindLastBookCopyCodeInsertedRepository } from '../../data/protocols/book_copies/find-last-book-copy-code-inserted.repository'
import { GiveBackCopyRepository } from '../../data/protocols/book_copies/give-back-copy.repository'
import { ListBookCopiesRepository } from '../../data/protocols/book_copies/load-book-copies.repository'
import { LoadBookCopyByIdRepository } from '../../data/protocols/book_copies/load-book-copy-by-id.repository'
import { LoadCopiesByUserIdRepository } from '../../data/protocols/book_copies/load-copies-by-user-id.repository'
import { LoadRentedCopiesByBookIdRepository } from '../../data/protocols/book_copies/load-rented-copies-by-book-id.repository'
import { LoadRentedCopiesByUserIdRepository } from '../../data/protocols/book_copies/load-rented-copies-by-user-id.repository'
import { LoadRentedCopiesRepository } from '../../data/protocols/book_copies/load-rented-copies.repository'
import { UpdateBookCopyStatusRepository } from '../../data/protocols/book_copies/update-book-copy.repository'
import { BookCopyModel, BookCopyStatus } from '../../domain/models/book_copy'
import { RentedCopy } from '../../domain/models/rented-copy'
import { PrismaHelper } from './prisma-helper'
import { LoadDelayedAndMisplacedCopiesRepository } from '../../data/protocols/book_copies/load-delayed-and-misplaced-copies.repository'

export class BookCopyPrismaRepository implements CreateBookCopyRepository, FindLastBookCopyCodeInsertedRepository, LoadBookCopyByIdRepository, DeleteBookCopyRepository, LoadRentedCopiesByUserIdRepository, LoadRentedCopiesByBookIdRepository, ListBookCopiesRepository, LoadCopiesByUserIdRepository, BorrowCopyRepository, GiveBackCopyRepository, LoadRentedCopiesRepository, UpdateBookCopyStatusRepository, RenewCopyRepository, LoadDelayedAndMisplacedCopiesRepository {
  async load (id: string): Promise<BookCopyModel[]> {
    const copies = await PrismaHelper.client.book_Copy.findMany({
      where: {
        located_by: id
      }
    })
    return copies && PrismaHelper.bookCopiesMapper(copies)
  }

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
    const bookCopy = await PrismaHelper.client.book_Copy.findFirst({
      where: {
        id
      },
      include: {
        user_rented: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            registration_number: true,
            admin: true,
            active: true
          }
        }
      }
    })
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

  async listAllByBookCode (book_code_prefix: string): Promise<BookCopyModel[]> {
    const copies = await PrismaHelper.client.book_Copy.findMany({
      where: {
        code: {
          contains: book_code_prefix
        }
      }
    })

    return copies && PrismaHelper.bookCopiesDtoMapper(copies)
  }

  async borrow (copyId: string, data: { locatedBy: string; devolutionDate: Date }): Promise<void> {
    await PrismaHelper.client.book_Copy.update({
      where: { id: copyId },
      data: {
        lease_date: new Date(),
        located_by: data.locatedBy,
        devolution_date: data.devolutionDate,
        status: CopyStatus.RENTED
      }
    })
  }

  async giveBackCopy (copyId: string): Promise<void> {
    await PrismaHelper.client.book_Copy.update({
      where: {
        id: copyId
      },
      data: {
        status: CopyStatus.AVAILABLE,
        located_by: null,
        lease_date: null,
        devolution_date: null
      }
    })
  }

  async loadAll (): Promise<BookCopyModel[]> {
    const copies = await PrismaHelper.client.book_Copy.findMany({ where: { status: CopyStatus.RENTED } })
    return copies && PrismaHelper.bookCopiesMapper(copies)
  }

  async updateToMisplaced (copyId: string): Promise<void> {
    await PrismaHelper.client.book_Copy.update({
      where: {
        id: copyId
      },
      data: {
        status: CopyStatus.MISPLACED
      }
    })
  }

  async updateToLate (copyId: string): Promise<void> {
    await PrismaHelper.client.book_Copy.update({
      where: {
        id: copyId
      },
      data: {
        status: CopyStatus.LATE
      }
    })
  }

  async renew (copyId: string, data: { devolutionDate: Date }): Promise<void | BookCopyModel> {
    await PrismaHelper.client.book_Copy.update({
      where: {
        id: copyId
      },
      data: {
        devolution_date: data.devolutionDate
      }
    })
  }

  async loadDelayedAndMisplaced (): Promise<BookCopyModel[]> {
    const copies = await PrismaHelper.client.book_Copy.findMany({
      where: {
        OR: [
          { status: CopyStatus.LATE },
          { status: CopyStatus.MISPLACED }
        ]
      }
    })
    return copies && PrismaHelper.bookCopiesMapper(copies)
  }
}
