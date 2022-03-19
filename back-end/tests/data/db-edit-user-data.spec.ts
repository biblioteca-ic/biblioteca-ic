import { UpdateUserByIdRepository } from '../../src/data/protocols/users/update-user-by-id.repository'
import { mockUserModelDto } from '../domain/mocks/user.mock'
import { UserModelDto } from '../../src/domain/models/user'
import { DbEditUserData } from '../../src/data/usecases/users/db-edit-user-data'

class UpdateUserByIdRepositoryStub implements UpdateUserByIdRepository {
  async update (id: string): Promise<UserModelDto|null> {
    return Promise.resolve(mockUserModelDto)
  }
}

type SutTypes = {
  updateUserByIdRepositoryStub: UpdateUserByIdRepository
  sut: DbEditUserData
}

const makeSut = (): SutTypes => {
  const updateUserByIdRepositoryStub = new UpdateUserByIdRepositoryStub()
  const sut = new DbEditUserData(updateUserByIdRepositoryStub)
  return {
    sut,
    updateUserByIdRepositoryStub
  }
}

describe('DbEditUserData', () => {
  it('should call UpdateUserByIdRepository with correct values', async () => {
    const { sut, updateUserByIdRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateUserByIdRepositoryStub, 'update')
    await sut.edit({ id: 'any_id', name: 'any_name' })
    expect(updateSpy).toHaveBeenCalledWith('any_id', { name: 'any_name' })
  })

  it('should return null if UpdateUserByIdRepository returns null', async () => {
    const { sut, updateUserByIdRepositoryStub } = makeSut()
    jest.spyOn(updateUserByIdRepositoryStub, 'update').mockReturnValue(Promise.resolve(null))
    const result = await sut.edit({ id: 'any_id', name: 'any_name' })
    expect(result).toBeNull()
  })

  it('should return UserModelDto on success', async () => {
    const { sut } = makeSut()
    const result = await sut.edit({ id: 'any_id', name: 'any_name' })
    expect(result).toEqual(mockUserModelDto)
  })
})
