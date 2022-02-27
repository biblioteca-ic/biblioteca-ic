import { UserModelDto } from '../../../domain/models/user'

export interface UpdateUserByIdRepository {
  update: (id: string, data: any) => Promise<UserModelDto>
}
