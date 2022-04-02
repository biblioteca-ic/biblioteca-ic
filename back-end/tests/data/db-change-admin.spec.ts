import { DbChangeAdmin } from '../../src/data/usecases/users/db-change-admin'
import { ChangeAdmin } from '../../src/domain/usecases/users/make-admin'
import { LoadUserByIdRepository } from '../../src/data/protocols/users/load-user-by-id.repository'
import { UserModel, UserModelDto } from '../domain/models/user'
import { mockUserModel, mockUserModelDto } from '../domain/mocks/user.mock'
import { UpdateUserByIdRepository } from '../../src/data/protocols/users/update-user-by-id.repository'

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

type SutTypes = {
  sut: ChangeAdmin
  loadUserByIdRepositoryStub: LoadUserByIdRepository
  updateUserByIdRepositoryStub: UpdateUserByIdRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = new LoadUserByIdRepositoryStub()
  const updateUserByIdRepositoryStub = new UpdateUserByIdRepositoryStub()
  const sut = new DbChangeAdmin(loadUserByIdRepositoryStub, updateUserByIdRepositoryStub)
  return {
    loadUserByIdRepositoryStub,
    updateUserByIdRepositoryStub,
    sut
  }
}

describe('DbChangeAdmin', () => {
  test('should call LoadUserByIdRepository with correct values', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.change({ id: 'any_id', admin: true })
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('should return null if LoadUserByIdReposiroty fails', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.change({ id: 'any_id', admin: true })
    expect(result).toBeNull()
  })

  test('should call UpdateUserByIdRepository with correct values', async () => {
    const { sut, updateUserByIdRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateUserByIdRepositoryStub, 'update')
    await sut.change({ id: 'any_id', admin: true })
    expect(updateSpy).toHaveBeenCalledWith('any_id', { admin: true })
  })

  test('should return a UserModelDto on success', async () => {
    const { sut } = makeSut()
    const result = await sut.change({ id: 'any_id', admin: true })
    expect(result).toEqual(mockUserModelDto)
  })
})
