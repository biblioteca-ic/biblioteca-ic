import { DbRenewBookCopy } from "../../../src/data/usecases/book_copies/db-renew-book-copy"
import { FindBookCopyById } from "../../../src/data/protocols/book_copies/find-book-copy-by-id"
import { RenewCopyRepository } from "../../../src/data/protocols/book_copies/renew-copy.repository"
import { BookCopyModel } from "../../../src/domain/models/book_copy"
import { bookCopyModelMock } from "../../domain/mocks/bookCopy.mock"

class FindBookCopyByIdStub implements FindBookCopyById {
  async find (id: string): Promise<BookCopyModel | void> {
    return Promise.resolve(bookCopyModelMock)
  }
}

class RenewCopyRepositoryStub implements RenewCopyRepository {
  async renew (copyId: string, data: { devolutionDate: Date }): Promise<BookCopyModel> {
    return Promise.resolve(bookCopyModelMock)
  }
}

type SutType = {
  sut: DbRenewBookCopy,
  findBookCopyByIdStub: FindBookCopyById,
  renewCopyRepositoryStub: RenewCopyRepository
}

const makeSut = (): SutType => {
  const findBookCopyByIdStub = new FindBookCopyByIdStub()
  const renewCopyRepositoryStub = new RenewCopyRepositoryStub()
  const sut = new DbRenewBookCopy(findBookCopyByIdStub, renewCopyRepositoryStub)
  jest.spyOn(sut, '_generateNewDevolutionDate').mockReturnValue(Promise.resolve(new Date))
  jest.spyOn(sut, '_checkRenewBookCopyPermission').mockReturnValue(Promise.resolve(undefined))
  return {
    sut,
    findBookCopyByIdStub,
    renewCopyRepositoryStub
  }
}

describe('DbRenewBookCopy', () => {
  test('should call FindBookCopyById with correct values', async () => {
    const { findBookCopyByIdStub, sut } = makeSut()
    const findBookCopyByIdSpy = jest.spyOn(findBookCopyByIdStub, 'find')
    await sut.execute('any_uuid')
    expect(findBookCopyByIdSpy).toBeCalledWith('any_uuid')
  })
  test('should return Error if FindBookCopyById fails', async () => {
    const { findBookCopyByIdStub, sut } = makeSut()
    jest.spyOn(findBookCopyByIdStub, 'find').mockReturnValueOnce(undefined)
    const response = await sut.execute('any_uuid')
    expect(response).toEqual(new Error('BookCopy any_uuid not found.'))
  })
  test('should call RenewCopyRepository with correct values', async () => {
    const { renewCopyRepositoryStub, sut } = makeSut()
    const renewCopyRepositorySpy = jest.spyOn(renewCopyRepositoryStub, 'renew')
    await sut.execute('any_uuid')
    expect(renewCopyRepositorySpy).toBeCalledWith('any_uuid', { devolutionDate: new Date() })
  })
  test('should return Error if RenewCopyRepository fails', async () => {
    const { renewCopyRepositoryStub, sut } = makeSut()
    jest.spyOn(renewCopyRepositoryStub, 'renew').mockReturnValueOnce(undefined)
    const response = await sut.execute('any_uuid')
    expect(response).toEqual(new Error('Copy renewal fail because RenewCopyRepository return undefined'))
  })
  test('should return Error if CheckRenewBookCopyPermission fails', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, '_checkRenewBookCopyPermission').mockReturnValueOnce(Promise.resolve(new Error()))
    const response = await sut.execute('any_uuid')
    expect(response).toBeInstanceOf(Error)
  })
  test('should return a BookCopyModel on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute('any_uuid')
    expect(response).toEqual(bookCopyModelMock)
  })
})