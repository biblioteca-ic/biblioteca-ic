import { DbAuthentication } from '../../data/usecases/db-authentication'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { JwtAdapter } from '../../infra/criptography/jwt-adapter'
import { UserPrismaRepository } from '../../infra/db/user-prisma-repository'
import { LoginController } from '../../presentation/controller/user/login-controller'
import { Request, Response } from 'express'
import { Validation } from '../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../presentation/validation/validators/validation-composite'

const makeLoginValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['cpf', 'password']) {
    validations.push(new RequiredFieldValidator(field))
  }
  const validationComposite = new ValidationComposite(validations)
  return validationComposite
}

export const makeLoginController = async (req: Request, res: Response): Promise<any> => {
  const loadUserByCpfRepository = new UserPrismaRepository()
  const bcryptAdapter = new BcryptAdapter()
  const secretKey = process.env.SECRET_KEY
  const jwtAdapter = new JwtAdapter(secretKey)
  const authentication = new DbAuthentication(loadUserByCpfRepository, bcryptAdapter, jwtAdapter)
  const controller = new LoginController(authentication, makeLoginValidation())
  const result = await controller.handle(req.body)
  return res.status(result.statusCode).json(result)
}
