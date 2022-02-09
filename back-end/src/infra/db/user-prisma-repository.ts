import { LoadUserByCpfRepository } from '../../data/protocols/load-user-by-cpf.repository'
import { UserModel } from '../../domain/models/user'
import { PrismaHelper } from './prisma-helper'

export class UserPrismaRepository implements LoadUserByCpfRepository {
  async loadByCpf (cpf: string): Promise<UserModel> {
    const user = await PrismaHelper.client.user.findFirst({ where: { cpf: cpf } })
    return user && PrismaHelper.userMapper(user)
  }
}
