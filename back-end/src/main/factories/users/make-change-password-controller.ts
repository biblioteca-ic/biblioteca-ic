import { Request, Response } from 'express'
import { DbChangePassword } from '../../../data/usecases/users/db-change-password'
import { ChangePassword } from '../../../domain/usecases/users/change-password'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { UserPrismaRepository } from '../../../infra/db/prisma/user-prisma-repository'
import { ChangePasswordController } from '../../../presentation/controller/user/change-password-controller'
import { Validation } from '../../../presentation/validation/protocols/validation'
import { CompareFieldsValidator } from '../../../presentation/validation/validators/compare-fields-validator'
import { FieldsAreDifferentValidator } from '../../../presentation/validation/validators/fields-are-different-validator'
import { PasswordValidator } from '../../../presentation/validation/validators/password-validator'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

const makeValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['oldPassword', 'newPassword', 'newPasswordConfirmation']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new CompareFieldsValidator('newPassword', 'newPasswordConfirmation'))
  validations.push(new FieldsAreDifferentValidator('oldPassword', 'newPassword'))
  validations.push(new PasswordValidator('newPassword'))
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

const makeChangePassword = (): ChangePassword => {
  const prismaRepository = new UserPrismaRepository()
  const hasher = new BcryptAdapter()
  const changePassword = new DbChangePassword(prismaRepository, prismaRepository, hasher, hasher)
  return changePassword
}

export const makeChangePasswordController = async (req: Request, res: Response): Promise<any> => {
  const controller = new ChangePasswordController(makeValidation(), makeChangePassword())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
