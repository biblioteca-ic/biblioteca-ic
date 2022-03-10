import { UserModelDto } from '../../../domain/models/user'

export interface ListUsersRepository {
  listAll: () => Promise<UserModelDto[]>
}
