import { UserModel } from '../../domain/models/user'

export interface LoadUserByRegisterNumberepository {
  loadByRegisterNumber: (registerNumber: string) => Promise<UserModel|null>
}
