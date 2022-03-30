import { UserModelDto } from '../../models/user'

export interface DeleteUser {
  deactivate: (id: string) => Promise<UserModelDto>
}
