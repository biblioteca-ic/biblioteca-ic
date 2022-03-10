import { Request, Response } from 'express'
import { DbListUsers } from '../../../data/usecases/users/db-list-users'
import { ListUsers } from '../../../domain/usecases/users/list-users'
import { UserPrismaRepository } from '../../../infra/db/user-prisma-repository'
import { ListUsersController } from '../../../presentation/controller/user/list-users.controller'

const makeListUsers = (): ListUsers => {
  const userPrismaRepository = new UserPrismaRepository()
  return new DbListUsers(userPrismaRepository)
}

export const makeListUsersController = async (req: Request, res: Response): Promise<any> => {
  const controller = new ListUsersController(makeListUsers())
  const request = { ...req.body, ...req.params }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
