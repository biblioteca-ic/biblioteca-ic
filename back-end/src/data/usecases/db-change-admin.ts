import { UserModelDto } from '../../domain/models/user'
import { ChangeAdmin } from '../../domain/usecases/make-admin'
import { LoadUserByIdRepository } from '../protocols/load-user-by-id.repository'
import { UpdateUserByIdRepository } from '../protocols/update-user-by-id.repository'

export class DbChangeAdmin implements ChangeAdmin {
  constructor (
    private readonly _loadUserByIdRepository: LoadUserByIdRepository,
    private readonly _updateUserByIdRepository: UpdateUserByIdRepository
  ) { }

  async change (params: ChangeAdmin.Params): Promise<UserModelDto> {
    const { id, admin } = params
    const user = await this._loadUserByIdRepository.loadById(id)
    if (user) {
      const updatedUser = await this._updateUserByIdRepository.update(id, { admin })
      return updatedUser
    }
    return null
  }
}
