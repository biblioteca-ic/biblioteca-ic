import { UserModel, UserModelDto } from '../../../domain/models/user'
import { ChangePassword } from '../../../domain/usecases/users/change-password'
import { HashComparer } from '../../protocols/hash-comparer'
import { Hasher } from '../../protocols/hasher'
import { LoadUserByIdRepository } from '../../protocols/users/load-user-by-id.repository'
import { UpdateUserByIdRepository } from '../../protocols/users/update-user-by-id.repository'

export class DbChangePassword implements ChangePassword {
  constructor (
    private readonly _loadUserByIdRepository: LoadUserByIdRepository,
    private readonly _updateUserByIdRepository: UpdateUserByIdRepository,
    private readonly _hashComparer: HashComparer,
    private readonly _hasher: Hasher
  ) { }

  async change (params: ChangePassword.Params): Promise<UserModelDto|null> {
    const { id, oldPassword, newPassword } = params
    const user: UserModel|null = await this._loadUserByIdRepository.loadById(id)
    if (user) {
      const equal = await this._hashComparer.compare(oldPassword, user.password)
      if (equal) {
        const hashedPassword = await this._hasher.hash(newPassword)
        const user = await this._updateUserByIdRepository.update(id, { password: hashedPassword })
        if (user) return user
      }
    }
    return null
  }
}
