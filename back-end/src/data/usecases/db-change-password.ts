import { UserModel } from '../../domain/models/user'
import { ChangePassword } from '../../domain/usecases/change-password'
import { HashComparer } from '../protocols/hash-comparer'
import { LoadUserByIdRepository } from '../protocols/load-user-by-id.repository'
import { UpdateUserByIdRepository } from '../protocols/update-user-by-id.repository'

export class DbChangePassword implements ChangePassword {
  constructor (
    private readonly _loadUserByIdRepository: LoadUserByIdRepository,
    private readonly _updateUserByIdRepository: UpdateUserByIdRepository,
    private readonly _hashComparer: HashComparer
  ) { }

  async change (params: ChangePassword.Params): Promise<void> {
    const { id, oldPassword, newPassword } = params
    const user: UserModel = await this._loadUserByIdRepository.loadById(id)
    if (user) {
      const equal = await this._hashComparer.compare(oldPassword, user.password)
      if (equal) {
        const hashedPassword = await this._hashComparer.hash(newPassword)
        await this._updateUserByIdRepository.update(id, { password: hashedPassword })
      }
    }
  }
}
