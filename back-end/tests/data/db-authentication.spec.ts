import { DbAuthentication } from '../../src/data/usecases/users/db-authentication'
import { UserModel } from '../../src/domain/models/user'
import { Authentication } from '../../src/domain/usecases/users/authentication'
import { Encrypter } from '../../src/data/protocols/encrypter'
import { HashComparer } from '../../src/data/protocols/hash-comparer'
import { Hasher } from '../../src/data/protocols/hasher'
import { LoadUserByCpfRepository } from '../../src/data/protocols/users/load-user-by-cpf.repository'

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
  cpf: '123.456.789-09',
  registration_number: '21112900',
  password: 'hashed_password',
  admin: false,
  created_at: new Date,
  updated_at: new Date
})

class LoadAccountByCpfRepositoryStub implements LoadUserByCpfRepository {
  async loadByCpf (cpf: string): Promise<UserModel|null> {
    return Promise.resolve(mockUser())
  }
}

class HashComparerStub implements HashComparer, Hasher {
  async compare (value: string, hash: string): Promise<boolean> {
    return Promise.resolve(true)
  }

  async hash (value: string): Promise<string> {
    return Promise.resolve('any_hash')
  }
}

class EncrypterStub implements Encrypter {
  async encrypt (data: { id: string, admin: boolean }): Promise<string> {
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
    await sut.auth({ cpf: '123.456.789-09', password: '123456' })
    expect(loadByCpfSpy).toHaveBeenCalledWith('123.456.789-09')
  })

  test('should return null if there is not an user using the cpf provided', async () => {
    const { sut, loadUserByCpfRepositoryStub } = makeSut()
    jest.spyOn(loadUserByCpfRepositoryStub, 'loadByCpf').mockReturnValueOnce(Promise.resolve(null))
    const accessToken = await sut.auth({ cpf: '123.456.789-09', password: '123456' })
    expect(accessToken).toBeNull()
  })

  test('should call hashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth({ cpf: '123.456.789-09', password: '123456' })
    expect(compareSpy).toHaveBeenCalledWith('123456', 'hashed_password')
  })

  test('should return null if hashComparer fails', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const token = await sut.auth({ cpf: '123.456.789-09', password: '123456' })
    expect(token).toBeNull()
  })

  test('should call encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth({ cpf: '123.456.789-09', password: '123456' })
    const user = mockUser()
    expect(encryptSpy).toHaveBeenCalledWith({ admin: user.admin, id: user.id })
  })

  test('should return a valid accessToken', async () => {
    const { sut, loadUserByCpfRepositoryStub } = makeSut()
    jest.spyOn(loadUserByCpfRepositoryStub, 'loadByCpf').mockReturnValueOnce(Promise.resolve(mockUser()))
    const token = await sut.auth({ cpf: '123.456.789-09', password: '123456' })
    expect(token).toEqual({
      id: 'uuid',
      name: 'any_name',
      email: 'any_email@email.com',
      cpf: '123.456.789-09',
      registration_number: '21112900',
      admin: false,
      accessToken: 'any_string',
      created_at: new Date,
      updated_at: new Date
    })
  })
})
