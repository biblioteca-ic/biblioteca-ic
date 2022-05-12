import { LoadUserByIdRepository } from '../../../data/protocols/users/load-user-by-id.repository'
import { PrismaHelper } from '../../../infra/db/prisma-helper'
import { UserModel, UserModelDto } from '../../../domain/models/user'
import { LoadUsers } from '../../../domain/usecases/users/load-users'
import { LoadUserByNameRepository } from '../../protocols/users/load-user-by-name.repository'
import { LoadUserByAdminRepository } from '../../protocols/users/load-users-by-admin.repository'
import { LoadUsersRepository } from '../../protocols/users/load-users.repository'

export class DbListUsers implements LoadUsers {
  constructor (
    private readonly _loadUsersRepository: LoadUsersRepository,
    private readonly _loadUserByNameRepository: LoadUserByNameRepository,
    private readonly _loadUserByAdminRepository: LoadUserByAdminRepository,
    private readonly _loadUserByIdRepository: LoadUserByIdRepository
  ) { }

  async loadAll (): Promise<UserModelDto[]> {
    const users = await this._loadUsersRepository.loadAll()
    return users
  }

  async loadByName (name: string): Promise<UserModelDto> {
    const user = await this._loadUserByNameRepository.loadByName(name)
    return user
  }

  async loadByAdmin (admin: boolean): Promise<UserModelDto[]> {
    const users = await this._loadUserByAdminRepository.loadByAdmin(admin)
    return users
  }

  async loadById (id: string): Promise<UserModelDto> {
    const user = await this._loadUserByIdRepository.loadById(id)
    return user && PrismaHelper.userDtoMapper(user)
  }
}
