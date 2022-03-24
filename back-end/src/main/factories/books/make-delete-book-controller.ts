import { Request, Response } from 'express'
import { DbDeleteBook } from '../../../data/usecases/books/db-delete-book'
import { DeleteBook } from '../../../domain/usecases/books/delete-book'
import { BookCopyPrismaRepository } from '../../../infra/db/book-copy-prisma-repository'
import { BookPrismaRepository } from '../../../infra/db/book-prisma-repository'
import { DeleteBookController } from '../../../presentation/controller/books/delete-book.controller'
import { Validation } from '../../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidator(field))
  }
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeDeleteBook = (): DeleteBook => {
  const bookPrismaRepository = new BookPrismaRepository()
  const bookCopyPrismaRepository = new BookCopyPrismaRepository()
  const deleteBook = new DbDeleteBook(bookCopyPrismaRepository, bookPrismaRepository)
  return deleteBook
}

export const makeDeleteBookController = async (req: Request, res: Response): Promise<any> => {
  const controller = new DeleteBookController(makeValidation(), makeDeleteBook())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
