import { Authentication } from '../../../src/domain/usecases/users/authentication'
import { LoginController } from '../../../src/presentation/controller/user/login-controller'
import { Controller } from '../../../src/presentation/protocols/controller'
import { AuthenticationModel } from '../../../src/domain/models/authentication'
import { badRequest } from '../../../src/presentation/helpers/http-helper'
import { Validation } from '../../../src/presentation/validation/protocols/validation'

type SutTypes = {
  sut: Controller
  authenticationStub: Authentication
  validationStub: Validation
}

const mockAuthenticationModel: AuthenticationModel = {
  id: 'uuid',
  name: 'any_name',
  email: 'any_email@email.com',
  cpf: '11122233345',
  registration_number: '123456',
  admin: false,
  accessToken: 'any_token'
}

class AuthenticationStub implements Authentication {
  async auth (data: Authentication.Params): Promise<AuthenticationModel> {
    return Promise.resolve(mockAuthenticationModel)
  }
}

class ValidationStub implements Validation {
  validate (input: any): Error|null {
    return null
  }
}

const makeSut = (): SutTypes => {
  const authenticationStub = new AuthenticationStub()
  const validationStub = new ValidationStub()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('LoginController', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle({ cpf: '123.456.789-01', password: '123456' })
    expect(validateSpy).toHaveBeenCalledWith({ cpf: '123.456.789-01', password: '123456' })
  })

  test('should return badRequest if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any_message'))
    const result = await sut.handle({ cpf: '123.456.789-01', password: '123456' })
    expect(result).toEqual(badRequest('any_message'))
  })

  test('should call authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle({ cpf: '123.456.789-01', password: '123456' })
    expect(authSpy).toHaveBeenCalledWith({ cpf: '123.456.789-01', password: '123456' })
  })

  test('should return 401 if authentication fails', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.handle({ cpf: '123.456.789-01', password: '123456' })
    expect(result.statusCode).toBe(401)
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({ cpf: '123.456.789-01', password: '123456' })
    expect(result.statusCode).toBe(200)
  })

  test('should return 500 if some error throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.reject(new Error()))
    const result = await sut.handle({ cpf: '123.456.789-01', password: '123456' })
    expect(result.statusCode).toBe(500)
  })
})
