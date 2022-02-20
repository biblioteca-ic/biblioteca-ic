import { AuthenticationModel } from '../../domain/models/authentication'
import { Authentication } from '../../domain/usecases/authentication'
import { Encrypter } from '../protocols/encrypter'
import { HashComparer } from '../protocols/hash-comparer'
import { LoadUserByCpfRepository } from '../protocols/load-user-by-cpf.repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly _loadUserByCpfRepository: LoadUserByCpfRepository,
    private readonly _hashComparer: HashComparer,
    private readonly _encrypter: Encrypter
  ) { }

  async auth (params: Authentication.Params): Promise<AuthenticationModel|null> {
    const { cpf, password } = params
    const user = await this._loadUserByCpfRepository.loadByCpf(cpf)
    if (user) {
      const isAuth = await this._hashComparer.compare(password, user.password)
      if (isAuth) {
        const accessToken = await this._encrypter.encrypt({ email: user.email, admin: user.admin })
        return { accessToken }
      }
    }
    return null
  }
}
