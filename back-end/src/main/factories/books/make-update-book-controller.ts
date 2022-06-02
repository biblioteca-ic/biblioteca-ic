import { Request, Response } from 'express'
import { DbUpdateBook } from '../../../data/usecases/books/db-update-book'
import { UpdateBook } from '../../../domain/usecases/books/update-book'
import { BookPrismaRepository } from '../../../infra/db/book-prisma-repository'
import { UpdateBookController } from '../../../presentation/controller/books/update-book.controller'
import { Validation } from '../../../presentation/validation/protocols/validation'
import { IsArrayValidator } from '../../../presentation/validation/validators/is-array-validator'
import { NumberValidator } from '../../../presentation/validation/validators/number-validator'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { UnwantedFieldValidator } from '../../../presentation/validation/validators/unwanted-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidator('id'))
  validations.push(new IsArrayValidator('authors'))
  validations.push(new IsArrayValidator('categories'))
  validations.push(new NumberValidator('publishedIn', 4))
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeUpdateBook = (): UpdateBook => {
  const bookPrismaRepository = new BookPrismaRepository()
  const updateBook = new DbUpdateBook(bookPrismaRepository, bookPrismaRepository)
  return updateBook
}

export const makeUpdateBookController = async (req: Request, res: Response): Promise<any> => {
  const controller = new UpdateBookController(makeValidation(), makeUpdateBook())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
