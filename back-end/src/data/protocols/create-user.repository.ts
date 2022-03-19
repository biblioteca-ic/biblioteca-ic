import { UserModelDto } from '../../domain/models/user'

export interface CreateUserRepository {
  create: (data: any) => Promise<UserModelDto>
}
