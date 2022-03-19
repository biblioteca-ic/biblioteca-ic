import { Controller } from '../../../src/presentation/protocols/controller'
import { ChangePasswordController } from '../../../src/presentation/controller/user/change-password-controller'
import { Validation } from '../../../src/presentation/validation/protocols/validation'
import { ChangePassword } from '../../../src/domain/usecases/users/change-password'
import { UserModelDto } from '../../../src/domain/models/user'
import { mockUserModelDto } from '../../domain/mocks/user.mock'
import { badRequest, ok, serverError } from '../../../src/presentation/helpers/http-helper'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  changePasswordStub: ChangePassword
}

class ValidationStub implements Validation {
  validate (input: any): Error|null {
    return null
  }
}

class ChangePasswordStub implements ChangePassword {
  async change (params: ChangePassword.Params): Promise<UserModelDto> {
    return Promise.resolve(mockUserModelDto)
  }
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const changePasswordStub = new ChangePasswordStub()
  const sut = new ChangePasswordController(validationStub, changePasswordStub)
  return {
    sut,
    validationStub,
    changePasswordStub
  }
}

const mockInput = { id: 'any_id', oldPassword: 'any_password', newPassword: 'any_new_password1', newPasswordConfirmation: 'any_new_password1' }

describe('ChangePassworController', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockInput)
    expect(validateSpy).toBeCalledWith(mockInput)
  })

  it('should return badRequest if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const result = await sut.handle(mockInput)
    expect(result).toEqual(badRequest(error.message))
    expect(result.statusCode).toBe(400)
  })

  it('should call ChangePassword with correct values', async () => {
    const { sut, changePasswordStub } = makeSut()
    const changeSpy = jest.spyOn(changePasswordStub, 'change')
    await sut.handle(mockInput)
    expect(changeSpy).toHaveBeenCalledWith(mockInput)
  })

  it('should return serverError if throws', async () => {
    const { sut, changePasswordStub } = makeSut()
    jest.spyOn(changePasswordStub, 'change').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle(mockInput)
    expect(result).toEqual(serverError())
    expect(result.statusCode).toBe(500)
  })

  it('should return Ok on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockInput)
    expect(result).toEqual(ok({ message: 'password has been changed successfully' }))
    expect(result.statusCode).toBe(200)
  })
})
