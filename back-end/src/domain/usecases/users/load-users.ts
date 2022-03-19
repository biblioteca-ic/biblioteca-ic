import { UserModelDto } from '../../models/user'

export interface LoadUsers {
  loadAll: () => Promise<UserModelDto[]>
  loadByName: (name: string) => Promise<UserModelDto|null>
  loadByAdmin: (admin: boolean) => Promise<UserModelDto[]>
}
