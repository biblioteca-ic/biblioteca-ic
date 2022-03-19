import { bookModelMock } from '../../domain/mocks/book.mock'
import { BookModel } from '../../../src/domain/models/book'
import { RegisterBook } from '../../../src/domain/usecases/books/register-book'
import { RegisterBookController } from '../../../src/presentation/controller/books/register-book.controller'
import { Controller } from '../../../src/presentation/protocols/controller'
import { Validation } from '../../../src/presentation/validation/protocols/validation'
import { badRequest } from '../../../src/presentation/helpers/http-helper'
import { BookCodeGenerator } from '../../domain/usecases/books/book-code-generator'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  registerBookStub: RegisterBook
  bookCodeGeneratorStub: BookCodeGenerator
}

class RegisterBookStub implements RegisterBook {
  async add (params: any): Promise<BookModel> {
    return Promise.resolve(bookModelMock)
  }
}

class ValidationStub implements Validation {
  validate (input: any): Error|null {
    return null
  }
}

class BookCodeGeneratorStub implements BookCodeGenerator {
  async generate (): Promise<string> {
    return Promise.resolve('0000-000')
  }
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const registerBookStub = new RegisterBookStub()
  const bookCodeGeneratorStub = new BookCodeGeneratorStub()
  const sut = new RegisterBookController(validationStub, registerBookStub, bookCodeGeneratorStub)
  return {
    sut,
    registerBookStub,
    validationStub,
    bookCodeGeneratorStub
  }
}

const mockCreateBookInput = {
  title: 'titulo',
  publishingHouse: 'editora',
  createdBy: 'uuid',
  authors: ['any_author1', 'any_author2'],
  categories: ['any_category'],
  publishedIn: new Date('01-01-2016')

}

describe('CreateBookController', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockCreateBookInput)
    expect(validateSpy).toHaveBeenCalledWith(mockCreateBookInput)
  })

  test('should return badRequest if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error('error_message')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const result = await sut.handle(mockCreateBookInput)
    expect(result).toEqual(badRequest(error.message))
    expect(result.statusCode).toBe(400)
  })

  test('should call BookCodeGenerator', async () => {
    const { sut, bookCodeGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(bookCodeGeneratorStub, 'generate')
    await sut.handle(mockCreateBookInput)
    expect(generateSpy).toHaveBeenCalled()
  })

  test('should call RegisterBook with correct values', async () => {
    const { sut, registerBookStub } = makeSut()
    const addSpy = jest.spyOn(registerBookStub, 'add')
    await sut.handle(mockCreateBookInput)
    expect(addSpy).toHaveBeenCalledWith({ ...mockCreateBookInput, code: '0000-000' })
  })

  test('should return serverError if throws', async () => {
    const { sut, registerBookStub } = makeSut()
    jest.spyOn(registerBookStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle(mockCreateBookInput)
    expect(result.statusCode).toEqual(500)
  })

  test('should return created on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockCreateBookInput)
    expect(result).toEqual({ statusCode: 201, body: bookModelMock })
  })
})
