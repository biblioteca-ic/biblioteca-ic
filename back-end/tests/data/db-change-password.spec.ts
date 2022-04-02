import { mockUserModel, mockUserModelDto } from '../domain/mocks/user.mock'
import { UserModel, UserModelDto } from '../../src/domain/models/user'
import { ChangePassword } from '../../src/domain/usecases/users/change-password'
import { HashComparer } from '../../src/data/protocols/hash-comparer'
import { Hasher } from '../../src/data/protocols/hasher'
import { LoadUserByIdRepository } from '../../src/data/protocols/users/load-user-by-id.repository'
import { UpdateUserByIdRepository } from '../../src/data/protocols/users/update-user-by-id.repository'
import { DbChangePassword } from '../../src/data/usecases/users/db-change-password'

class LoadUserByIdRepositoryStub implements LoadUserByIdRepository {
  async loadById (id: string): Promise<UserModel> {
    return Promise.resolve(mockUserModel)
  }
}

class UpdateUserByIdRepositoryStub implements UpdateUserByIdRepository {
  async update (id: string): Promise<UserModelDto> {
    return Promise.resolve(mockUserModelDto)
  }
}

class HasheComparerStub implements HashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}

class HasherStub implements Hasher {
  async hash (value: string): Promise<string> {
    return Promise.resolve('any_hashed_pass')
  }
}

type SutTypes = {
  sut: ChangePassword
  loadUserByIdRepositoryStub: LoadUserByIdRepository
  updateUserByIdRepositoryStub: UpdateUserByIdRepositoryStub
  hashComparerStub: HashComparer
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = new LoadUserByIdRepositoryStub()
  const updateUserByIdRepositoryStub = new UpdateUserByIdRepositoryStub()
  const hashComparerStub = new HasheComparerStub()
  const hasherStub = new HasherStub()
  const sut = new DbChangePassword(loadUserByIdRepositoryStub, updateUserByIdRepositoryStub, hashComparerStub, hasherStub)
  return {
    hasherStub,
    hashComparerStub,
    loadUserByIdRepositoryStub,
    updateUserByIdRepositoryStub,
    sut
  }
}

describe('DbChangePassword', () => {
  test('should call LoadUserByIdRepository with correct values', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.change({ id: 'any_id', oldPassword: 'any_password', newPassword: 'any_new_password' })
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return null if LoadUserByIdRepository fails', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.change({ id: 'any_id', oldPassword: 'any_password', newPassword: 'any_new_password' })
    expect(result).toBeNull()
  })

  test('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.change({ id: 'any_id', oldPassword: 'any_password', newPassword: 'any_new_password' })
    expect(compareSpy).toHaveBeenCalledWith('any_password', mockUserModel.password)
  })

  test('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const result = await sut.change({ id: 'any_id', oldPassword: 'any_password', newPassword: 'any_new_password' })
    expect(result).toBeNull()
  })

  test('should call Hasher with correct values', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.change({ id: 'any_id', oldPassword: 'any_password', newPassword: 'any_new_password' })
    expect(hashSpy).toHaveBeenCalledWith('any_new_password')
  })

  test('should return null if UpdateUserByIdRepository returns null', async () => {
    const { sut, updateUserByIdRepositoryStub } = makeSut()
    jest.spyOn(updateUserByIdRepositoryStub, 'update').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.change({ id: 'any_id', oldPassword: 'any_password', newPassword: 'any_new_password' })
    expect(result).toBeNull()
  })

  test('should return a UserModelDto on success', async () => {
    const { sut } = makeSut()
    const result = await sut.change({ id: 'any_id', oldPassword: 'any_password', newPassword: 'any_new_password' })
    expect(result).toEqual(mockUserModelDto)
  })
})
