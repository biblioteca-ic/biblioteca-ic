import { Request, Response } from 'express'
import { DbDeleteBookCopy } from '../../../data/usecases/book_copies/db-delete-book-copy'

import { DeleteBookCopy } from '../../../domain/usecases/book_copies/delete-book-copy'
import { BookCopyPrismaRepository } from '../../../infra/db/book-copy-prisma-repository'

import { DeleteBookCopyController } from '../../../presentation/controller/book_copies/delete-book-copy.controller'

import { Validation } from '../../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['book_id']) {
    validations.push(new RequiredFieldValidator(field))
  }
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeDeleteBookCopy = (): DeleteBookCopy => {
  const bookCopyPrismaRepository = new BookCopyPrismaRepository()
  const deleteBookCopy = new DbDeleteBookCopy(bookCopyPrismaRepository, bookCopyPrismaRepository)
  return deleteBookCopy
}

export const makeDeleteBookCopyController = async (req: Request, res: Response): Promise<any> => {
  const controller = new DeleteBookCopyController(makeValidation(), makeDeleteBookCopy())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
