import { UserModelDto } from '../../../domain/models/user'

export interface LoadUserByAdminRepository {
  loadByAdmin: (admmin: boolean) => Promise<UserModelDto[]>
}
