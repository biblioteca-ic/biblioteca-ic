import { UserModelDto } from '../../../domain/models/user'
import { LoadUsers } from '../../../domain/usecases/users/load-users'
import { LoadUserByNameRepository } from '../../protocols/users/load-user-by-name.repository'
import { LoadUserByAdminRepository } from '../../protocols/users/load-users-by-admin.repository'
import { LoadUsersRepository } from '../../protocols/users/load-users.repository'

export class DbListUsers implements LoadUsers {
  constructor (
    private readonly _loadUsersRepository: LoadUsersRepository,
    private readonly _loadUserByNameRepository: LoadUserByNameRepository,
    private readonly _loadUserByAdminRepository: LoadUserByAdminRepository
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
}
