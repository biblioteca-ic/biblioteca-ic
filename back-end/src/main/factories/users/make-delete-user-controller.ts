import { Request, Response } from 'express'
import { DbDeleteUser } from '../../../data/usecases/users/db-delete-user'
import { DeleteUser } from '../../../domain/usecases/users/delete-user'
import { UserPrismaRepository } from '../../../infra/db/user-prisma-repository'
import { DeleteUserController } from '../../../presentation/controller/user/delete-user.controller'
import { Validation } from '../../../presentation/validation/protocols/validation'
import { RequiredFieldValidator } from '../../../presentation/validation/validators/required-field-validator'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

const makeDeleteUser = (): DeleteUser => {
  const userPrismaRepository = new UserPrismaRepository()
  const editUserData = new DbDeleteUser(userPrismaRepository)
  return editUserData
}

const makeDeleteUserValidation = (): Validation => {
  const idRequired = new RequiredFieldValidator('id')
  return new ValidationComposite([idRequired])
}

export const makeDeleteUserController = async (req: Request, res: Response): Promise<any> => {
  const controller = new DeleteUserController(makeDeleteUserValidation(), makeDeleteUser())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
