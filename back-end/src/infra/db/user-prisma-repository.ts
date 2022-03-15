import { CreateUserRepository } from '../../data/protocols/create-user.repository'
import { LoadUserByEmailRepository } from '../../data/protocols/load-user-by-email.repository'
import { LoadUserByRegisterNumberepository } from '../../data/protocols/load-user-by-registernumber.repository'
import { LoadUsersRepository } from '../../data/protocols/users/load-users.repository'
import { LoadUserByCpfRepository } from '../../data/protocols/users/load-user-by-cpf.repository'
import { LoadUserByIdRepository } from '../../data/protocols/users/load-user-by-id.repository'
import { UpdateUserByIdRepository } from '../../data/protocols/users/update-user-by-id.repository'
import { UserModel, UserModelDto } from '../../domain/models/user'
import { PrismaHelper } from './prisma-helper'
import { LoadUserByNameRepository } from '../../data/protocols/users/load-user-by-name.repository'
import { LoadUserByAdminRepository } from '../../data/protocols/users/load-users-by-admin.repository'
import { DeleteUserRepository } from '../../data/protocols/users/delete-user.repository'

export class UserPrismaRepository implements LoadUserByCpfRepository, UpdateUserByIdRepository, DeleteUserRepository, LoadUserByAdminRepository, LoadUserByIdRepository, CreateUserRepository, LoadUsersRepository, LoadUserByNameRepository, LoadUserByEmailRepository, LoadUserByRegisterNumberepository {
  async loadByCpf (cpf: string): Promise<UserModel> {
    const user = await PrismaHelper.client.user.findFirst({ where: { cpf: cpf, active: true } })
    return user && PrismaHelper.userMapper(user)
  }

  async loadByEmail (email: string): Promise<UserModel> {
    const user = await PrismaHelper.client.user.findFirst({ where: { email: email, active: true } })
    return user && PrismaHelper.userMapper(user)
  }

  async loadByRegisterNumber (registerNumber: string): Promise<UserModel> {
    const user = await PrismaHelper.client.user.findFirst({ where: { registration_number: registerNumber, active: true } })
    return user && PrismaHelper.userMapper(user)
  }

  async update (id: string, data: any): Promise<UserModelDto> {
    const mappedUser = PrismaHelper.userDbMapper(data)
    const user = await PrismaHelper.client.user.update({ where: { id }, data: mappedUser })
    return user && PrismaHelper.userDtoMapper(user)
  }

  async loadById (id: string): Promise<UserModel> {
    const user = await PrismaHelper.client.user.findFirst({ where: { id, active: true } })
    return user && PrismaHelper.userMapper(user)
  }

  async create (data: any): Promise<UserModelDto> {
    const mappedUser = PrismaHelper.userDbMapper(data)
    const user = await PrismaHelper.client.user.create({ data: mappedUser })

    return user && PrismaHelper.userDtoMapper(user)
  }

  async loadAll (): Promise<UserModelDto[]> {
    const users = await PrismaHelper.client.user.findMany({ where: { active: true } })
    return users && PrismaHelper.usersDtoMapper(users)
  }

  async loadByName (name: string): Promise<UserModelDto> {
    const user = await PrismaHelper.client.user.findFirst({ where: { name: { contains: name }, active: true } })
    return user && PrismaHelper.userDtoMapper(user)
  }

  async loadByAdmin (admin: boolean): Promise<UserModelDto[]> {
    const users = await PrismaHelper.client.user.findMany({ where: { admin, active: true } })
    return users && PrismaHelper.usersDtoMapper(users)
  }

  async deactivate (id: string): Promise<UserModel> {
    const deactivatedUser = await PrismaHelper.client.user.update({ where: { id }, data: { active: false } })
    return deactivatedUser && PrismaHelper.userMapper(deactivatedUser)
  }
}
