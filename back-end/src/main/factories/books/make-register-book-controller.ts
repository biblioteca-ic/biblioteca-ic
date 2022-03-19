import { Request, Response } from 'express'
import { DbRegisterBook } from '../../../data/usecases/books/db-register-book'
import { BookCodeGenerator } from '../../../domain/usecases/books/book-code-generator'
import { RegisterBook } from '../../../domain/usecases/books/register-book'
import { BookPrismaRepository } from '../../../infra/db/prisma/book-prisma-repository'
import { UserPrismaRepository } from '../../../infra/db/prisma/user-prisma-repository'
import { RegisterBookController } from '../../../presentation/controller/books/register-book.controller'
import { Validation } from '../../../presentation/validation/protocols/validation'
import { IsArrayValidator } from '../../../presentation/validation/validators/is-array-validator'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'
import { DbBookCodeGenerator } from '../../../data/usecases/books/db-book-code-generator'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['title', 'publishingHouse', 'publishedIn', 'createdBy', 'authors', 'categories']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new IsArrayValidator('authors'))
  validations.push(new IsArrayValidator('categories'))
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeRegisterBook = (): RegisterBook => {
  const bookPrismaRepository = new BookPrismaRepository()
  const userPrismaRepository = new UserPrismaRepository()
  const changeAdmin = new DbRegisterBook(bookPrismaRepository, userPrismaRepository)
  return changeAdmin
}

const makeBookCodeGenerator = (): BookCodeGenerator => {
  const bookPrismaRepository = new BookPrismaRepository()
  return new DbBookCodeGenerator(bookPrismaRepository)
}

export const makeRegisterBookController = async (req: Request, res: Response): Promise<any> => {
  const controller = new RegisterBookController(makeValidation(), makeRegisterBook(), makeBookCodeGenerator())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
