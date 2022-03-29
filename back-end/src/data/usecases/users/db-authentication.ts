import { AuthenticationModel } from '../../../domain/models/authentication'
import { Authentication } from '../../../domain/usecases/users/authentication'
import { Encrypter } from '../../protocols/encrypter'
import { HashComparer } from '../../protocols/hash-comparer'
import { LoadUserByCpfRepository } from '../../protocols/users/load-user-by-cpf.repository'
import { LoadUserByAdminRepository } from '../../protocols/users/load-users-by-admin.repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly _loadUserByCpfRepository: LoadUserByCpfRepository,
    private readonly _loadUserByAdminRepository: LoadUserByAdminRepository,
    private readonly _hashComparer: HashComparer,
    private readonly _encrypter: Encrypter
  ) { }

  async auth (params: Authentication.Params): Promise<AuthenticationModel> {
    const { cpf, password } = params
    const user = await this._loadUserByCpfRepository.loadByCpf(cpf)
    const adminUsers = await this._loadUserByAdminRepository.loadByAdmin(true)
    if (user) {
      const isAuth = await this._hashComparer.compare(password, user.password)
      if (isAuth) {
        const accessToken = await this._encrypter.encrypt({ id: user.id, admin: user.admin })
        const { password, ...userWithoutPass } = user
        const isOnlyAdmin = (adminUsers.length === 1 && adminUsers[0].id === user.id)
        return Object.assign({}, userWithoutPass, { accessToken, isOnlyAdmin })
      }
    }
    return null
  }
}
