import { Authentication } from '../../src/domain/usecases/authentication'
import { LoginController } from '../../src/presentation/controller/user/login-controller'
import { Controller } from '../../src/presentation/protocols/controller'
import { AuthenticationModel } from '../domain/models/authentication'

type SutTypes = {
  sut: Controller
  authenticationStub: Authentication
}

const mockAuthenticationModel: AuthenticationModel = { accessToken: 'any_token' }

class AuthenticationStub implements Authentication {
  async auth (data: Authentication.Params): Promise<AuthenticationModel|null> {
    return Promise.resolve(mockAuthenticationModel)
  }
}

const makeSut = (): SutTypes => {
  const authenticationStub = new AuthenticationStub()
  const sut = new LoginController(authenticationStub)
  return {
    sut,
    authenticationStub
  }
}

describe('LoginController', () => {
  test('should call authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle({ cpf: '00000000000', password: '123456' })
    expect(authSpy).toHaveBeenCalledWith({ cpf: '00000000000', password: '123456' })
  })

  test('should return 401 if authentication fails', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.handle({ cpf: '00000000000', password: '123456' })
    expect(result.statusCode).toBe(401)
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({ cpf: '00000000000', password: '123456' })
    expect(result.statusCode).toBe(200)
  })

  test('should return 500 if some error throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.reject(new Error()))
    const result = await sut.handle({ cpf: '00000000000', password: '123456' })
    expect(result.statusCode).toBe(500)
  })
})
