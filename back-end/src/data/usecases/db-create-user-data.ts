import { UserModelDto } from '../../domain/models/user'
import { CreateUserData } from '../../domain/usecases/create-user-data'
import { CreateUserRepository } from '../protocols/create-user.repository'
import { LoadUserByCpfRepository } from '../protocols/users/load-user-by-cpf.repository'
import { LoadUserByEmailRepository } from '../protocols/load-user-by-email.repository'
import { LoadUserByRegisterNumberepository } from '../protocols/load-user-by-registernumber.repository'
import { Hasher } from '../protocols/hasher'
import { CpfAlreadyInUseError, EmailAlreadyInUseError, RegistrationNumberAlreadyInUseError } from '../errors/exceptions'

export class DbCreateUserData implements CreateUserData {
  constructor (
    private readonly _createUser: CreateUserRepository,
    private readonly _loadUserByCpfRepository: LoadUserByCpfRepository,
    private readonly _loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly _loadUserByRegisterNumberRepository: LoadUserByRegisterNumberepository,
    private readonly _hasher: Hasher
  ) { }

  async create (params: CreateUserData.Params): Promise<UserModelDto | Error> {
    const { cpf, email, name, registrationNumber, admin, password } = params

    const isCpfUnavailable = await this._loadUserByCpfRepository.loadByCpf(cpf)
    const isEmailUnavailable = await this._loadUserByEmailRepository.loadByEmail(email)
    const isRegisterNumberUnavailable = await this._loadUserByRegisterNumberRepository.loadByRegisterNumber(registrationNumber)

    if (isCpfUnavailable) {
      return new CpfAlreadyInUseError()
    }

    if (isEmailUnavailable) {
      return new EmailAlreadyInUseError()
    }

    if (isRegisterNumberUnavailable) {
      return new RegistrationNumberAlreadyInUseError()
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
