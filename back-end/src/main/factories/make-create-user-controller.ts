import { Request, Response } from 'express'
import { DbCreateUserData } from '../../data/usecases/db-create-user-data'
import { CreateUserData } from '../../domain/usecases/create-user-data'
import { UserPrismaRepository } from '../../infra/db/user-prisma-repository'
import { EmailValidatorAdapter } from '../adapters/email-validator-adapter'
import { CreateUserController } from '../../presentation/controller/user/create-user-controller'
import { Validation } from '../../presentation/validation/protocols/validation'
import { EmailValidator } from '../../presentation/validation/validators/email-validator'
import { CpfValidator } from '../../presentation/validation/validators/cpf-validator'
import { RegistrationNumberValidator } from '../../presentation/validation/validators/registrationNumber-validator'
import { RequiredFieldValidator } from '../../presentation/validation/validators/required-field-validator'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { ValidationComposite } from '../../presentation/validation/validators/validation-composite'
import { CompareFieldsValidator } from '../../presentation/validation/validators/compare-fields-validator'
import { PasswordValidator } from '../../presentation/validation/validators/password-validator'

const makeCreateUserData = (): CreateUserData => {
  const prismaRepository = new UserPrismaRepository()
  const hasher = new BcryptAdapter()
  const createUserData = new DbCreateUserData(prismaRepository, prismaRepository, prismaRepository, prismaRepository, hasher)

  return createUserData
}

const makeCreateUserValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'registrationNumber', 'cpf', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new EmailValidator('email', new EmailValidatorAdapter()))
  validations.push(new RegistrationNumberValidator('registrationNumber'))
  validations.push(new CpfValidator('cpf'))
  validations.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
  validations.push(new PasswordValidator('password'))
  const validation = new ValidationComposite(validations)

  return validation
}

export const makeCreateUserController = async (req: Request, res: Response): Promise<any> => {
  const controller = new CreateUserController(makeCreateUserData(), makeCreateUserValidation())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result.body)
}
