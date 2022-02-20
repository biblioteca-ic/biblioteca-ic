import { Request, Response } from 'express'
import { DbChangeAdmin } from '../../data/usecases/db-change-admin'
import { ChangeAdmin } from '../../domain/usecases/make-admin'
import { UserPrismaRepository } from '../../infra/db/user-prisma-repository'
import { ChangeAdminController } from '../../presentation/controller/user/change-admin.controller'
import { Validation } from '../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../presentation/validation/validators/validation-composite'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['id', 'admin']) {
    validations.push(new RequiredFieldValidator(field))
  }
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeChangeAdmin = (): ChangeAdmin => {
  const prismaRepository = new UserPrismaRepository()
  const changeAdmin = new DbChangeAdmin(prismaRepository, prismaRepository)
  return changeAdmin
}

export const makeChangeAdminController = async (req: Request, res: Response): Promise<any> => {
  const controller = new ChangeAdminController(makeValidation(), makeChangeAdmin())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
