import { Request, Response } from 'express'
import { DbListUsers } from '../../../data/usecases/users/db-load-users'
import { LoadUsers } from '../../../domain/usecases/users/load-users'
import { UserPrismaRepository } from '../../../infra/db/prisma/user-prisma-repository'
import { ListUsersController } from '../../../presentation/controller/user/list-users.controller'

const makeListUsers = (): LoadUsers => {
  const userPrismaRepository = new UserPrismaRepository()
  return new DbListUsers(userPrismaRepository, userPrismaRepository, userPrismaRepository)
}

export const makeListUsersController = async (req: Request, res: Response): Promise<any> => {
  const controller = new ListUsersController(makeListUsers())
  const request = { ...req.body, ...req.params, ...req.query }
  const result = await controller.handle(request)
  return res.status(result.statusCode).json(result)
}
