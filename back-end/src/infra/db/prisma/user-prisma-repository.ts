import { LoadUserByCpfRepository } from '../../../data/protocols/load-user-by-cpf.repository'
import { UserModel } from '../../../domain/models/user'
import prisma from './prisma-client'
import { PrismaHelper } from './prisma-helper'

export class UserPrismaRepository implements LoadUserByCpfRepository {
  async loadByCpf (cpf: string): Promise<UserModel|null> {
    const user = await prisma.users.findFirst({ where: { cpf: cpf } })
    return user && PrismaHelper.userMapper(user)
  }
}
