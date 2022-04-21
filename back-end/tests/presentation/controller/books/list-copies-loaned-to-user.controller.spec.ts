import { BookCopyModel } from "../../../../src/domain/models/book_copy"
import { ListCopiesLoanedToUser } from "../../../../src/domain/usecases/book_copies/list-copies-loaned-to-user"
import { Controller } from "../../../../src/presentation/protocols/controller"
import { Validation } from "../../../../src/presentation/validation/protocols/validation"
import { ListCopiesLoanedToUserController, ListCopiesLoanedToUserRequest } from "../../../../src/presentation/controller/book_copies/list-copies-loaned-to-user.controller"
import { badRequest, ok } from "../../../../src/presentation/helpers/http-helper"
import { bookCopyModelMock } from "../../../domain/mocks/bookCopy.mock"

type SutTypes = {
  sut: Controller,
  validationStub: Validation
  listCopiesLoanedToUserStub: ListCopiesLoanedToUser
}

class ValidationStub implements Validation {
  validate(input: any): Error {
    return null
  }
}

class ListCopiesLoanedToUserStub implements ListCopiesLoanedToUser {
  async list(user_id: string): Promise<BookCopyModel[]> {
    return Promise.resolve([ bookCopyModelMock ])
  }
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const listCopiesLoanedToUserStub = new ListCopiesLoanedToUserStub()
  const sut = new ListCopiesLoanedToUserController(validationStub, listCopiesLoanedToUserStub)
  return {
    sut,
    validationStub,
    listCopiesLoanedToUserStub
  }
}

const listCopiesLoanedToUserRequestMock: ListCopiesLoanedToUserRequest = {
  user_id: 'any_uuid'
}

describe('ListCopiesLoanedToUserController', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(listCopiesLoanedToUserRequestMock)
    expect(validateSpy).toHaveBeenCalledWith(listCopiesLoanedToUserRequestMock)
  })
  test('should return badRequest if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error('error_message')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const result = await sut.handle(listCopiesLoanedToUserRequestMock)
    expect(result).toEqual(badRequest(error.message))
    expect(result.statusCode).toBe(400)
  })
  test('should call list method from listCopiesLoanedToUser with correctly values', async () => {
    const { sut, listCopiesLoanedToUserStub } = makeSut()
    const listSpy = jest.spyOn(listCopiesLoanedToUserStub, 'list')
    await sut.handle(listCopiesLoanedToUserRequestMock)
    expect(listSpy).toHaveBeenCalledWith(listCopiesLoanedToUserRequestMock.user_id)
  })
  test('should return serverError if throws', async () => {
    const { sut, listCopiesLoanedToUserStub } = makeSut()
    jest.spyOn(listCopiesLoanedToUserStub, 'list').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle(listCopiesLoanedToUserRequestMock)
    expect(result.statusCode).toEqual(500)
  })
  test('should return a list of BookCopyModel on sucess', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(listCopiesLoanedToUserRequestMock)
    expect(result).toEqual(ok([ bookCopyModelMock ]))
    expect(result.statusCode).toBe(200)
  })
})