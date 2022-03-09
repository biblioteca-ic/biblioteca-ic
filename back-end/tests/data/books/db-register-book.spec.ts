import { bookModelMock } from '../../domain/mocks/book.mock'
import { CreateBookRepository } from '../../../src/data/protocols/books/create-book.repository'
import { BookModel } from '../../../src/domain/models/book'
import { RegisterBook } from '../../../src/domain/usecases/books/register-book'
import { DbRegisterBook } from '../../../src/data/usecases/books/db-register-book'
import { LoadUserByIdRepository } from '../../../src/data/protocols/users/load-user-by-id.repository'
import { UserModel } from '../../../src/domain/models/user'
import { mockUserModel } from '../../domain/mocks/user.mock'

class CreateBookRepositoryStub implements CreateBookRepository {
  async create (params: any): Promise<BookModel> {
    return Promise.resolve(bookModelMock)
  }
}

class LoadUserByIdRepositoryStub implements LoadUserByIdRepository {
  async loadById (id: string): Promise<UserModel> {
    return Promise.resolve(mockUserModel)
  }
}

type SutTypes = {
  sut: RegisterBook
  createBookRepositoryStub: CreateBookRepository
  loadUserByIdRepositoryStub: LoadUserByIdRepository
}

const makeSut = (): SutTypes => {
  const createBookRepositoryStub = new CreateBookRepositoryStub()
  const loadUserByIdRepositoryStub = new LoadUserByIdRepositoryStub()
  const sut = new DbRegisterBook(createBookRepositoryStub, loadUserByIdRepositoryStub)
  return {
    createBookRepositoryStub,
    loadUserByIdRepositoryStub,
    sut
  }
}

const mockCreateBookInput = {
  title: 'titulo',
  publishingHouse: 'editora',
  createdBy: 'uuid',
  authors: ['any_author1', 'any_author2'],
  code: '0000-000',
  categories: ['any_category'],
  publishedIn: new Date('01-01-2016')

}

describe('DbCreateBook', () => {
  test('should call CreateBookRepository with correct values', async () => {
    const { sut, createBookRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createBookRepositoryStub, 'create')
    await sut.add(mockCreateBookInput)
    expect(createSpy).toHaveBeenCalledWith(mockCreateBookInput)
  })

  test('should call LoadUserByIdRepository with correct values', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.add(mockCreateBookInput)
    expect(loadByIdSpy).toHaveBeenCalledWith(mockCreateBookInput.createdBy)
  })

  test('should return null if user is not admin', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const { admin, ...user } = mockUserModel
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(Object.assign({}, user, { admin: false })))
    const result = await sut.add(mockCreateBookInput)
    expect(result).toBeNull()
  })

  test('sould return a book on success', async () => {
    const { sut } = makeSut()
    const result = await sut.add(mockCreateBookInput)
    expect(result).toEqual(bookModelMock)
  })
})
