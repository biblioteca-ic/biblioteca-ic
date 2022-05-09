import { UserModel, UserModelDto } from '../../models/user'

export interface LoadUsers {
  loadAll: () => Promise<UserModelDto[]>
  loadByName: (name: string) => Promise<UserModelDto>
  loadByAdmin: (admin: boolean) => Promise<UserModelDto[]>
  loadById: (id: string) => Promise<UserModel>
}
