import { Request, Response } from 'express'
import { DbRegisterBookCopy } from '../../../data/usecases/book_copies/db-register-book-copy'

import { RegisterBookCopy } from '../../../domain/usecases/book_copies/register-book-copy'
import { BookCopyPrismaRepository } from '../../../infra/db/book-copy-prisma-repository'
import { BookPrismaRepository } from '../../../infra/db/book-prisma-repository'
import { UserPrismaRepository } from '../../../infra/db/user-prisma-repository'

import { RegisterBookCopyController } from '../../../presentation/controller/book_copies/register-book-copy.controller'

import { Validation } from '../../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'
import { DbBookCopyCodeGenerator } from '../../../data/usecases/book_copies/db-book-copy-code-generator'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['book_code', 'created_by']) {
    validations.push(new RequiredFieldValidator(field))
  }
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeRegisterBookCopy = (): RegisterBookCopy => {
  const bookCopyPrismaRepository = new BookCopyPrismaRepository()
  const userPrismaRepository = new UserPrismaRepository()
  const bookPrismaRepository = new BookPrismaRepository()
  const bookCopy = new DbRegisterBookCopy(bookCopyPrismaRepository, userPrismaRepository, bookPrismaRepository, new DbBookCopyCodeGenerator(bookCopyPrismaRepository), bookCopyPrismaRepository)
  return bookCopy
}

export const makeRegisterBookCopyController = async (req: Request, res: Response): Promise<any> => {
  const controller = new RegisterBookCopyController(makeValidation(), makeRegisterBookCopy())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
