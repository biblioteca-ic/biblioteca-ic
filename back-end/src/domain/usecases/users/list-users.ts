import { UserModelDto } from '../../models/user'

export interface ListUsers {
  listAll: () => Promise<UserModelDto[]>
}
