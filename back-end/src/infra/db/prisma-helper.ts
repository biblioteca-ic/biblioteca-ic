import { PrismaClient } from '@prisma/client'
import { BookModel } from '../../domain/models/book'
import { BookCopyModel } from '../../domain/models/book_copy'
import { UserModel, UserModelDto } from '../../domain/models/user'

export const PrismaHelper = {
  client: new PrismaClient(),
  userMapper: (prismaUser: any): UserModel => {
    const { registration_number, ...userWithoutRegistrationNumber } = prismaUser
    return Object.assign({}, userWithoutRegistrationNumber, { registrationNumber: registration_number })
  },
  userDtoMapper: (prismaUser: any): UserModelDto => {
    const { registration_number, password, ...data } = prismaUser
    return Object.assign({}, data, { registrationNumber: registration_number })
  },
  usersDtoMapper: (prismaUsers: any[]): UserModelDto[] => {
    return prismaUsers.map((user) => PrismaHelper.userDtoMapper(user))
  },
  userDbMapper: (entityUser: any): any => {
    const { registrationNumber, ...userWithoutRegistrationNumber } = entityUser
    return Object.assign({}, userWithoutRegistrationNumber, { registration_number: registrationNumber })
  },
  bookMapper: (prismaBook: any): BookModel => {
    const { publishing_house, created_by, published_in, created_at, ...rest } = prismaBook
    return Object.assign({}, rest, { publishingHouse: publishing_house, createdBy: created_by, publishedIn: published_in, createdAt: created_at })
  },
  bookDbMapper: (entityBook: any): any => {
    const { publishingHouse, createdBy, publishedIn, createdAt, ...rest } = entityBook
    return Object.assign({}, rest, { publishing_house: publishingHouse, created_by: createdBy, published_in: publishedIn, created_at: createdAt })
  },
  bookCopyMapper: (prismaBookCopy: any): BookCopyModel => {
    const { code, created_by, book_id, ...rest } = prismaBookCopy
    return Object.assign({}, rest, { code, created_by, book_id })
  },
  bookCopyDbMapper: (entityBookCopy: any): any => {
    const { code, created_by, book_id, ...rest } = entityBookCopy
    return Object.assign({}, rest, { code, created_by, book_id })
  },
  booksMapper: (prismaBooks: any[]): BookModel[] => {
    const books = prismaBooks.map((book) => PrismaHelper.bookMapper(book))
    return books
  }
}
