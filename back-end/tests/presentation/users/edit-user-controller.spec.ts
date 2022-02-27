import { mockUserModelDto } from '../../domain/mocks/user.mock'
import { UserModelDto } from '../../../src/domain/models/user'
import { EditUserData } from '../../../src/domain/usecases/users/edit-user-data'
import { EditUserController } from '../../../src/presentation/controller/user/edit-user-controller'
import { Controller } from '../../../src/presentation/protocols/controller'
import { Validation } from '../../../src/presentation/validation/protocols/validation'
import { badRequest, ok, serverError } from '../../../src/presentation/helpers/http-helper'

type SutTypes = {
  editUserDataStub: EditUserData
  validationStub: Validation
  sut: Controller
}

class ValidationStub implements Validation {
  validate (input: any): Error {
    return null
  }
}

class DbEditUserDataStub implements EditUserData {
  async edit (params: EditUserData.Params): Promise<UserModelDto> {
    return Promise.resolve(mockUserModelDto)
  }
}

const makeSut = (): SutTypes => {
  const editUserDataStub = new DbEditUserDataStub()
  const validationStub = new ValidationStub()
  const sut = new EditUserController(editUserDataStub, validationStub)
  return {
    editUserDataStub,
    validationStub,
    sut
  }
}

describe('EditUserController', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle({ id: 'any_id', name: 'any_name' })
    expect(validateSpy).toHaveBeenCalledWith({ id: 'any_id', name: 'any_name' })
  })

  it('should return badRequest if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const result = await sut.handle({ id: 'any_id', name: 'any_name' })
    expect(result).toEqual(badRequest(error.message))
    expect(result.statusCode).toBe(400)
  })

  it('should call EditUserData with correct values', async () => {
    const { sut, editUserDataStub } = makeSut()
    const editSpy = jest.spyOn(editUserDataStub, 'edit')
    await sut.handle({ id: 'any_id', name: 'any_name' })
    expect(editSpy).toHaveBeenCalledWith({ id: 'any_id', name: 'any_name' })
  })

  it('should return serverError if throws', async () => {
    const { sut, editUserDataStub } = makeSut()
    jest.spyOn(editUserDataStub, 'edit').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle({ id: 'any_id', name: 'any_name' })
    expect(result).toEqual(serverError())
    expect(result.statusCode).toBe(500)
  })

  it('should return ok on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({ id: 'any_id', name: 'any_name' })
    expect(result).toEqual(ok(mockUserModelDto))
    expect(result.statusCode).toBe(200)
  })
})
