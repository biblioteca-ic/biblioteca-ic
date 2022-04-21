import { DbGiveBackCopy } from '../../../data/usecases/book_copies/give-back-copy'
import { GiveBackCopy } from '../../../domain/usecases/book_copies/give-back-copy'
import { GiveBackBookCopyController } from '../../../presentation/controller/book_copies/give-back-copy.controller'
import { Request, Response } from 'express'
import { BookCopyPrismaRepository } from '../../../infra/db/book-copy-prisma-repository'
import { Validation } from '../../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['copyId']) {
    validations.push(new RequiredFieldValidator(field))
  }
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeGiveBackBookCopy = (): GiveBackCopy => {
  const bookCopyPrismaRepository = new BookCopyPrismaRepository()
  const giveBackCopy = new DbGiveBackCopy(bookCopyPrismaRepository)
  return giveBackCopy
}

export const makeGiveBackBookCopyController = async (req: Request, res: Response): Promise<any> => {
  const controller = new GiveBackBookCopyController(makeValidation(), makeGiveBackBookCopy())
  const request = { ...req.body }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
