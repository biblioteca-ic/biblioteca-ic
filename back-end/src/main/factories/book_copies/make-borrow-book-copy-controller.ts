import { DbBorrowCopy } from '../../../data/usecases/book_copies/db-borrow-copy'
import { BorrowCopy } from '../../../domain/usecases/book_copies/borrow-copy'
import { BookCopyPrismaRepository } from '../../../infra/db/book-copy-prisma-repository'
import { BorrowBookCopyController } from '../../../presentation/controller/book_copies/borrow-book-copy.controller'
import { Validation } from '../../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'
import { Request, Response } from 'express'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['bookId', 'userId', 'copyId']) {
    validations.push(new RequiredFieldValidator(field))
  }
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeBorrowBookCopy = (): BorrowCopy => {
  const bookCopyPrismaRepository = new BookCopyPrismaRepository()
  const borrowBookCopy = new DbBorrowCopy(bookCopyPrismaRepository, bookCopyPrismaRepository)
  return borrowBookCopy
}

export const makeBorrowBookCopyController = async (req: Request, res: Response): Promise<any> => {
  const controller = new BorrowBookCopyController(makeValidation(), makeBorrowBookCopy())
  const request = { ...req.body }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
