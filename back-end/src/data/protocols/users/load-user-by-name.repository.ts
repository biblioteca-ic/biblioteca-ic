import { UserModelDto } from '../../../domain/models/user'

export interface LoadUserByNameRepository {
  loadByName: (name: string) => Promise<UserModelDto|null>
}
