import { CreateUserRepository } from '../../data/protocols/create-user.repository'
import { LoadUserByEmailRepository } from '../../data/protocols/load-user-by-email.repository'
import { LoadUserByRegisterNumberepository } from '../../data/protocols/load-user-by-registernumber.repository'
import { LoadUserByCpfRepository } from '../../data/protocols/users/load-user-by-cpf.repository'
import { LoadUserByIdRepository } from '../../data/protocols/users/load-user-by-id.repository'
import { UpdateUserByIdRepository } from '../../data/protocols/users/update-user-by-id.repository'
import { UserModel, UserModelDto } from '../../domain/models/user'
import { PrismaHelper } from './prisma-helper'

export class UserPrismaRepository implements LoadUserByCpfRepository, UpdateUserByIdRepository, LoadUserByIdRepository, CreateUserRepository, LoadUserByEmailRepository, LoadUserByRegisterNumberepository {
  async loadByCpf (cpf: string): Promise<UserModel> {
    const user = await PrismaHelper.client.user.findFirst({ where: { cpf: cpf } })
    return user && PrismaHelper.userMapper(user)
  }

  async loadByEmail (email: string): Promise<UserModel> {
    const user = await PrismaHelper.client.user.findFirst({ where: { email: email } })
    return user && PrismaHelper.userMapper(user)
  }

  async loadByRegisterNumber (registerNumber: string): Promise<UserModel> {
    const user = await PrismaHelper.client.user.findFirst({ where: { registration_number: registerNumber } })
    return user && PrismaHelper.userMapper(user)
  }

  async update (id: string, data: any): Promise<UserModelDto> {
    const mappedUser = PrismaHelper.userDbMapper(data)
    const user = await PrismaHelper.client.user.update({ where: { id }, data: mappedUser })
    return user && PrismaHelper.userDtoMapper(user)
  }

  async loadById (id: string): Promise<UserModel> {
    const user = await PrismaHelper.client.user.findFirst({ where: { id } })
    return user && PrismaHelper.userMapper(user)
  }

  async create (data: any): Promise<UserModelDto> {
    const mappedUser = PrismaHelper.userDbMapper(data)
    const user = await PrismaHelper.client.user.create({ data: mappedUser })

    return user && PrismaHelper.userDtoMapper(user)
  }
}
