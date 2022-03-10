import { UserModelDto } from '../../../domain/models/user'
import { ListUsers } from '../../../domain/usecases/users/list-users'
import { ListUsersRepository } from '../../protocols/users/list-users.repository'

export class DbListUsers implements ListUsers {
  constructor (private readonly _listUsersRepository: ListUsersRepository) { }

  async listAll (): Promise<UserModelDto[]> {
    const users = await this._listUsersRepository.listAll()
    return users
  }
}
