import { DbGiveBackCopy } from '../../../data/usecases/book_copies/give-back-copy'
import { GiveBackCopy } from '../../../domain/usecases/book_copies/give-back-copy'
import { GiveBackBookCopyController } from '../../../presentation/controller/book_copies/give-back-copy.controller'
import { Request, Response } from 'express'
import { BookCopyPrismaRepository } from '../../../infra/db/book-copy-prisma-repository'
import { Validation } from '../../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'
import { RenewBookCopy } from '../../../domain/usecases/book_copies/renew-book-copy'
import { DbRenewBookCopy } from '../../../data/usecases/book_copies/db-renew-book-copy'
import { RenewBorrowedBookCopyController } from '../../../presentation/controller/book_copies/renew-borrowed-book-copy.controller'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['copyId']) {
    validations.push(new RequiredFieldValidator(field))
  }
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeRenewBookCopy = (): RenewBookCopy => {
  const bookCopyPrismaRepository = new BookCopyPrismaRepository()
  const renewCopy = new DbRenewBookCopy(bookCopyPrismaRepository, bookCopyPrismaRepository)
  return renewCopy
}

export const makeRenewBookCopyController = async (req: Request, res: Response): Promise<any> => {
  const controller = new RenewBorrowedBookCopyController(makeValidation(), makeRenewBookCopy())
  const request = { ...req.body, ...req.params, ...req.query }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
