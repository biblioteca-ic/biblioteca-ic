import { LoadCopiesByUserIdRepository } from "../../../src/data/protocols/book_copies/load-copies-by-user-id.repository"
import { DbListCopiesLoanedToUser } from "../../../src/data/usecases/books/db-list-copies-loaned-to-user"
import { BookCopyModel } from "../../../src/domain/models/book_copy"
import { ListCopiesLoanedToUser } from "../../../src/domain/usecases/book_copies/list-copies-loaned-to-user"
import { bookCopyModelMock } from "../../domain/mocks/bookCopy.mock"

class LoadCopiesByUseridRepositoryStub implements LoadCopiesByUserIdRepository {
  async load(id: string): Promise<BookCopyModel[]> {
    return Promise.resolve([ bookCopyModelMock ])
  }
}

type SutTypes = {
  sut: ListCopiesLoanedToUser,
  loadCopiesByUserIdRepositoryStub: LoadCopiesByUserIdRepository
}

const makeSut = (): SutTypes => {
  const loadCopiesByUserIdRepositoryStub = new LoadCopiesByUseridRepositoryStub()
  const sut = new DbListCopiesLoanedToUser(loadCopiesByUserIdRepositoryStub)
  return {
    loadCopiesByUserIdRepositoryStub,
    sut
  }
}

describe('DbListCopiesLoanedToUser', () => {
  test('should call loadCopiesByUserIdRepositoryStub with correct values', async () => {
    const { sut, loadCopiesByUserIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCopiesByUserIdRepositoryStub, 'load')
    await sut.list('any_uuid')
    expect(loadSpy).toHaveBeenCalledWith('any_uuid')
  })
  test('should return a bookCopy on success', async () => {
    const { sut } = makeSut()
    const result = await sut.list('any_uuid')
    expect(result).toEqual([ bookCopyModelMock ])
  })
})