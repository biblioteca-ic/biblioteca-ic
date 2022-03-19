import { UserModel } from '../../../domain/models/user'

export interface DeleteUserRepository {
  deactivate: (id: string) => Promise<UserModel>
}
