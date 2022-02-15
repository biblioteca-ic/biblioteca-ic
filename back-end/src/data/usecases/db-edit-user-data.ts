import { UserModelDto } from '../../domain/models/user'
import { EditUserData } from '../../domain/usecases/edit-user-data'
import { UpdateUserByIdRepository } from '../protocols/update-user-by-id.repository'

export class DbEditUserData implements EditUserData {
  constructor (private readonly _updateUserById: UpdateUserByIdRepository) { }

  async edit (params: EditUserData.Params): Promise<UserModelDto> {
    const { id, ...userWithoutId } = params
    const user = await this._updateUserById.update(id, userWithoutId)
    if (user) return user
    return null
  }
}
