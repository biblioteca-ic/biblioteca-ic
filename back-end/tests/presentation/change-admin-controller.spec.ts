import { ChangeAdmin } from '../../src/domain/usecases/users/make-admin'
import { Controller } from '../../src/presentation/protocols/controller'
import { Validation } from '../../src/presentation/validation/protocols/validation'
import { mockUserModelDto } from '../domain/mocks/user.mock'
import { UserModelDto } from '../domain/models/user'
import { ChangeAdminController } from '../../src/presentation/controller/user/change-admin.controller'
import { badRequest, ok, serverError } from '../../src/presentation/helpers/http-helper'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  changeAdminStub: ChangeAdmin

}

class ValidationStub implements Validation {
  validate (input: any): Error {
    return null
  }
}

class ChangeAdminStub implements ChangeAdmin {
  async change (params: ChangeAdmin.Params): Promise<UserModelDto> {
    return Promise.resolve(mockUserModelDto)
  }
}

const makeSut = (): SutTypes => {
  const changeAdminStub = new ChangeAdminStub()
  const validationStub = new ValidationStub()
  const sut = new ChangeAdminController(validationStub, changeAdminStub)
  return {
    changeAdminStub,
    validationStub,
    sut
  }
}

describe('ChangeAdminController', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle({ id: 'any_id', admin: true })
    expect(validateSpy).toHaveBeenCalledWith({ id: 'any_id', admin: true })
  })

  it('should return badRequest if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const result = await sut.handle({ id: 'any_id', admin: true })
    expect(result).toEqual(badRequest(error.message))
    expect(result.statusCode).toBe(400)
  })

  it('should call ChangeAdmin with correct values', async () => {
    const { sut, changeAdminStub } = makeSut()
    const changeSpy = jest.spyOn(changeAdminStub, 'change')
    await sut.handle({ id: 'any_id', admin: true })
    expect(changeSpy).toHaveBeenCalledWith({ id: 'any_id', admin: true })
  })

  it('should return serverError if throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle({ id: 'any_id', admin: true })
    expect(result).toEqual(serverError())
    expect(result.statusCode).toBe(500)
  })

  it('should return ok on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({ id: 'any_id', admin: true })
    expect(result).toEqual(ok(mockUserModelDto))
    expect(result.statusCode).toBe(200)
  })
})
