import { UserModelDto } from '../../domain/models/user'
import { CreateUserData } from '../../domain/usecases/create-user-data'
import { CreateUserRepository } from '../protocols/create-user.repository'
import { LoadUserByCpfRepository } from '../protocols/users/load-user-by-cpf.repository'
import { LoadUserByEmailRepository } from '../protocols/load-user-by-email.repository'
import { LoadUserByRegisterNumberepository } from '../protocols/load-user-by-registernumber.repository'
import { Hasher } from '../protocols/hasher'

export class DbCreateUserData implements CreateUserData {
  constructor (
    private readonly _createUser: CreateUserRepository,
    private readonly _loadUserByCpfRepository: LoadUserByCpfRepository,
    private readonly _loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly _loadUserByRegisterNumberRepository: LoadUserByRegisterNumberepository,
    private readonly _hasher: Hasher
  ) { }

  async create (params: CreateUserData.Params): Promise<UserModelDto> {
    const { cpf, email, name, registrationNumber, admin, password } = params

    const isCpfAvailable = await this._loadUserByCpfRepository.loadByCpf(cpf)
    const isEmailAvailable = await this._loadUserByEmailRepository.loadByEmail(email)
    const isRegisterNumberAvailable = await this._loadUserByRegisterNumberRepository.loadByRegisterNumber(registrationNumber)

    if (isCpfAvailable || isEmailAvailable || isRegisterNumberAvailable) {
      return null
    }

    const hashedPassword = await this._hasher.hash(password)
    const user = await this._createUser.create({
      cpf,
      email,
      name,
      password: hashedPassword,
      registrationNumber,
      admin
    })

    return user
  }
}
