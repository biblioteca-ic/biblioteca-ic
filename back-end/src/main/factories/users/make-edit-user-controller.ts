import { Request, Response } from 'express'
import { DbEditUserData } from '../../../data/usecases/users/db-edit-user-data'
import { EditUserData } from '../../../domain/usecases/users/edit-user-data'
import { UserPrismaRepository } from '../../../infra/db/user-prisma-repository'
import { EmailValidatorAdapter } from '../../adapters/email-validator-adapter'
import { EditUserController } from '../../../presentation/controller/user/edit-user-controller'
import { Validation } from '../../../presentation/validation/protocols/validation'
import { EmailValidator } from '../../../presentation/validation/validators/email-validator'
import { RegistrationNumberValidator } from '../../../presentation/validation/validators/registrationNumber-validator'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

const makeEditUserData = (): EditUserData => {
  const updateUserDataById = new UserPrismaRepository()
  const editUserData = new DbEditUserData(updateUserDataById)
  return editUserData
}

const makeEditUserValidation = (): Validation => {
  const idRequired = new RequiredFieldValidator('id')
  const emailFormat = new EmailValidator('email', new EmailValidatorAdapter())
  const registrationNumberFormat = new RegistrationNumberValidator('registrationNumber')
  const validation = new ValidationComposite([idRequired, emailFormat, registrationNumberFormat])
  return validation
}

export const makeEditUserController = async (req: Request, res: Response): Promise<any> => {
  const controller = new EditUserController(makeEditUserData(), makeEditUserValidation())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
