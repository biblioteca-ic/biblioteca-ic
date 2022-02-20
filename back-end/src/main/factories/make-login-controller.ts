import { DbAuthentication } from '../../data/usecases/db-authentication'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { JwtAdapter } from '../../infra/criptography/jwt-adapter'
import { UserPrismaRepository } from '../../infra/db/prisma/user-prisma-repository'
import { LoginController } from '../../presentation/controller/user/login-controller'
import { Request, Response } from 'express'

export const makeLoginController = async (req: Request, res: Response): Promise<any> => {
  const loadUserByCpfRepository = new UserPrismaRepository()
  const bcryptAdapter = new BcryptAdapter()
  const secretKey = process.env.SECRET_KEY as string
  const jwtAdapter = new JwtAdapter(secretKey)
  const authentication = new DbAuthentication(loadUserByCpfRepository, bcryptAdapter, jwtAdapter)
  const controller = new LoginController(authentication)
  const result = await controller.handle(req.body)
  return res.status(result.statusCode).json(result.body)
}
