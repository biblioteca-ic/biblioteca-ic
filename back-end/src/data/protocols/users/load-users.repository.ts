import { UserModelDto } from '../../../domain/models/user'

export interface LoadUsersRepository {
  loadAll: () => Promise<UserModelDto[]>
}
