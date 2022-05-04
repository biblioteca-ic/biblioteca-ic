import { DbBorrowCopy } from '../../../src/data/usecases/book_copies/db-borrow-copy'
import { LoadCopiesByUserIdRepository } from '../../../src/data/protocols/book_copies/load-copies-by-user-id.repository'
import { BorrowCopyRepository } from '../../../src/data/protocols/book_copies/borrow-copy.repository'
import { BookCopyModel } from '../../../src/domain/models/book_copy'
import { BorrowCopy } from '../../../src/domain/usecases/book_copies/borrow-copy'
import { bookCopyModelMock } from '../../domain/mocks/bookCopy.mock'

type SutType = {
  sut: DbBorrowCopy,
  loadCopiesByUserIdRepositoryStub: LoadCopiesByUserIdRepository,
  borrowCopyRepositoryStub: BorrowCopyRepository
}

class LoadCopiesByUserIdRepositoryStub implements LoadCopiesByUserIdRepository {
  async load (id: string): Promise<BookCopyModel[]> {
    return Promise.resolve([ bookCopyModelMock ])
  }
}

class BorrowCopyRepositoryStub implements BorrowCopyRepository {
  async borrow (copyId: string, data: { locatedBy: string; devolutionDate: Date }): Promise<void> {
    return Promise.resolve(undefined)
  }
}

const makeSut = (): SutType => {
  const loadCopiesByUserIdRepositoryStub = new LoadCopiesByUserIdRepositoryStub()
  const borrowCopyRepositoryStub = new BorrowCopyRepositoryStub()
  const sut = new DbBorrowCopy(loadCopiesByUserIdRepositoryStub, borrowCopyRepositoryStub)
  jest.spyOn(sut, '_generateNewDevolutionDate').mockReturnValue(Promise.resolve(new Date()))
  jest.spyOn(sut, '_checkUserPendencies').mockReturnValue(Promise.resolve())
  return {
    sut,
    loadCopiesByUserIdRepositoryStub,
    borrowCopyRepositoryStub
  }
}

const mockParams: BorrowCopy.Params = {
  userId: 'any_uuid',
  copyId: 'any_uuid',
  bookId: 'any_uuid'
}

describe('DbBorrowCopy', () => {
  test('should call LoadCopiesByUserIdRepository with correct parameters', async () => {
    const { sut, loadCopiesByUserIdRepositoryStub } = makeSut()
    const loadCopiesByUserIdRepositorySpy = jest.spyOn(loadCopiesByUserIdRepositoryStub, 'load')
    await sut.execute(mockParams)
    expect(loadCopiesByUserIdRepositorySpy).toBeCalledWith(mockParams.userId)
  })
  test('should call BorrowCopyRepository with correct parameters', async () => {
    const { sut, borrowCopyRepositoryStub } = makeSut()
    const borrowCopyRepositorySpy = jest.spyOn(borrowCopyRepositoryStub, 'borrow')
    await sut.execute(mockParams)
    expect(borrowCopyRepositorySpy).toBeCalledWith(mockParams.copyId, {
      locatedBy: mockParams.userId,
      devolutionDate: new Date()
    })
  })
  test('should return Error if CheckUserPendencies returns a new Error', async () => {
    const { sut } = makeSut()
    const checkUserPendenciesSpy = jest.spyOn(sut, '_checkUserPendencies')
    const error = new Error('any_error')
    checkUserPendenciesSpy.mockReturnValueOnce(Promise.resolve(error))
    const response = await sut.execute(mockParams)
    expect(response).toBe(error)
  })
  test('should return null on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(mockParams)
    expect(response).toBeNull()
  })
})