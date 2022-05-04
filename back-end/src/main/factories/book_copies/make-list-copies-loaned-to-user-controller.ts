import { Request, Response } from 'express'
import { DbListCopiesLoanedToUser } from '../../../data/usecases/books/db-list-copies-loaned-to-user'
import { ListCopiesLoanedToUser } from '../../../domain/usecases/book_copies/list-copies-loaned-to-user'
import { BookCopyPrismaRepository } from '../../../infra/db/book-copy-prisma-repository'
import { ListCopiesLoanedToUserController } from '../../../presentation/controller/book_copies/list-copies-loaned-to-user.controller'
import { Validation } from '../../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['user_id']) {
    validations.push(new RequiredFieldValidator(field))
  }
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeListCopiesLoanedToUser = (): ListCopiesLoanedToUser => {
  const bookCopiesPrismaRepository = new BookCopyPrismaRepository()
  return new DbListCopiesLoanedToUser(bookCopiesPrismaRepository)
}

export const makeListCopiesLoanedToUserController = async (req: Request, res: Response): Promise<any> => {
  const controller = new ListCopiesLoanedToUserController(makeValidation(), makeListCopiesLoanedToUser())
  const request = { ...req.body, ...req.params, ...req.query }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
