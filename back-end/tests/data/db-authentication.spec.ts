import { DbAuthentication } from '../../src/data/usecases/db-authentication'
import { UserModel } from '../domain/models/user'
import { Authentication } from '../domain/usecases/authentication'
import { Encrypter } from './protocols/encrypter'
import { HashComparer } from './protocols/hash-comparer'
import { LoadUserByCpfRepository } from './protocols/load-user-by-cpf.repository'

type SutTypes = {
  sut: Authentication
  loadUserByCpfRepositoryStub: LoadUserByCpfRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
}

const mockUser = (): UserModel => ({
  id: 'uuid',
  name: 'any_name',
  email: 'any_email@email.com',
  cpf: '11122233345',
  registrationNumber: 123456,
  password: 'hashed_password',
  admin: false
})

class LoadAccountByCpfRepositoryStub implements LoadUserByCpfRepository {
  async loadByCpf (cpf: string): Promise<UserModel> {
    return Promise.resolve(mockUser())
  }
}

class HashComparerStub implements HashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}

class EncrypterStub implements Encrypter {
  async encrypt (data: { email: string, admin: boolean }): Promise<string> {
    return Promise.resolve('any_string')
  }
}

const makeSut = (): SutTypes => {
  const loadUserByCpfRepositoryStub = new LoadAccountByCpfRepositoryStub()
  const hashComparerStub = new HashComparerStub()
  const encrypterStub = new EncrypterStub()
  const sut = new DbAuthentication(loadUserByCpfRepositoryStub, hashComparerStub, encrypterStub)
  return {
    sut,
    loadUserByCpfRepositoryStub,
    hashComparerStub,
    encrypterStub
  }
}

describe('DbAuthentication', () => {
  test('should call loadUserByCpfRepository with correct value', async () => {
    const { sut, loadUserByCpfRepositoryStub } = makeSut()
    const loadByCpfSpy = jest.spyOn(loadUserByCpfRepositoryStub, 'loadByCpf')
    await sut.auth({ cpf: '00000000000', password: '123456' })
    expect(loadByCpfSpy).toHaveBeenCalledWith('00000000000')
  })

  test('should return null if there is not an user using the cpf provided', async () => {
    const { sut, loadUserByCpfRepositoryStub } = makeSut()
    jest.spyOn(loadUserByCpfRepositoryStub, 'loadByCpf').mockReturnValueOnce(Promise.resolve(null))
    const accessToken = await sut.auth({ cpf: '00000000000', password: '123456' })
    expect(accessToken).toBeNull()
  })

  test('should call hashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth({ cpf: '00000000000', password: '123456' })
    expect(compareSpy).toHaveBeenCalledWith('123456', 'hashed_password')
  })

  test('should return null if hashComparer fails', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const token = await sut.auth({ cpf: '00000000000', password: '123456' })
    expect(token).toBeNull()
  })

  test('should call encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth({ cpf: '00000000000', password: '123456' })
    const user = mockUser()
    expect(encryptSpy).toHaveBeenCalledWith({ admin: user.admin, email: user.email })
  })

  test('should return a valid accessToken', async () => {
    const { sut } = makeSut()
    const token = await sut.auth({ cpf: '00000000000', password: '123456' })
    expect(token).toEqual({ accessToken: 'any_string' })
  })
})
