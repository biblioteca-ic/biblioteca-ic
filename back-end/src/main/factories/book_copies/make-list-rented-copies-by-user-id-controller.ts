import { Validation } from '../../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'
import { Request, Response } from 'express'
import { DbListRentedCopiesByUserId } from '../../../data/usecases/users/db-list-rented-copies-by-user-id'
import { ListRentedCopiesByUserId } from '../../../domain/usecases/users/list-rented-copies-by-user-id'
import { BookCopyPrismaRepository } from '../../../infra/db/book-copy-prisma-repository'
import { ListRentedCopiesByUserIdController } from '../../../presentation/controller/book_copies/list-rented-copies-by-user-id.controller'

const makeListRentedCopiesByUserIdValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidator('userId'))
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeListRentedCopiesByUserId = (): ListRentedCopiesByUserId => {
  const bookCopiesPrismaRepository = new BookCopyPrismaRepository()
  return new DbListRentedCopiesByUserId(bookCopiesPrismaRepository)
}

export const makeListRentedCopiesByUserIdController = async (req: Request, res: Response): Promise<any> => {
  const controller = new ListRentedCopiesByUserIdController(makeListRentedCopiesByUserIdValidation(), makeListRentedCopiesByUserId())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
