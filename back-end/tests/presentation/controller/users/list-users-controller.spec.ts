import { UserModelDto } from "@/domain/models/user"
import { LoadUsers } from "domain/usecases/users/load-users"
import { ListUsersController } from "presentation/controller/user/list-users.controller"
import { mockUserModelDto } from "../../../domain/mocks/user.mock"
import { ok, notFound, serverError } from '../../../../src/presentation/helpers/http-helper'

type SutTypes = {
  loadUsersStub: LoadUsers
  sut: ListUsersController
}

class LoadUsersStub implements LoadUsers {
  async loadAll(): Promise<UserModelDto[]> {
    return Promise.resolve([ mockUserModelDto ])
  }
  async loadByName(name: string): Promise<UserModelDto> {
    return Promise.resolve(mockUserModelDto)
  }
  async loadByAdmin(admin: boolean): Promise<UserModelDto[]> {
    return Promise.resolve([ mockUserModelDto ])
  }
}

const makeSut = (): SutTypes => {
  const loadUsersStub = new LoadUsersStub
  const sut = new ListUsersController(loadUsersStub)
  return {
    loadUsersStub,
    sut
  }
}

describe('LoginController', () => {
  test('should call loadAll with correct values', async () => {
    const { loadUsersStub, sut } = makeSut()
    const loadAllSpy = jest.spyOn(loadUsersStub, 'loadAll')
    await sut.handle({})
    expect(loadAllSpy).toBeCalled()
  })
  test('should call loadByName with correct values', async () => {
    const { loadUsersStub, sut } = makeSut()
    const loadByNameSpy = jest.spyOn(loadUsersStub, 'loadByName')
    await sut.handle({ name: 'someone' })
    expect(loadByNameSpy).toBeCalledWith('someone')
  })
  test('should call loadByAdmin with correct values', async () => {
    const { loadUsersStub, sut } = makeSut()
    const loadByAdminSpy = jest.spyOn(loadUsersStub, 'loadByAdmin')
    await sut.handle({ admin: 'true' })
    expect(loadByAdminSpy).toBeCalledWith(true)
    await sut.handle({ admin: 'false' })
    expect(loadByAdminSpy).toBeCalledWith(false)
  })
  test('should return serverError if throws Error into loadAll', async () => {
    const { sut, loadUsersStub } = makeSut()
    jest.spyOn(loadUsersStub, 'loadAll').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle({})
    expect(result).toEqual(serverError())
    expect(result.statusCode).toBe(500)
  })
  test('should return serverError if throws Error into loadByName', async () => {
    const { sut, loadUsersStub } = makeSut()
    jest.spyOn(loadUsersStub, 'loadByName').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle({ name: 'someone' })
    expect(result).toEqual(serverError())
    expect(result.statusCode).toBe(500)
  })
  test('should return serverError if throws Error into loadByAdmin', async () => {
    const { sut, loadUsersStub } = makeSut()
    jest.spyOn(loadUsersStub, 'loadByAdmin').mockImplementationOnce(() => {
      throw new Error()
    })
    const firstResult = await sut.handle({ admin: 'true' })
    expect(firstResult).toEqual(serverError())
    expect(firstResult.statusCode).toBe(500)
    jest.spyOn(loadUsersStub, 'loadByAdmin').mockImplementationOnce(() => {
      throw new Error()
    })
    const secondResult = await sut.handle({ admin: 'false' })
    expect(secondResult).toEqual(serverError())
    expect(secondResult.statusCode).toBe(500)
  })
  test('should return notFound if loadAll return a empty list', async () => {
    const { sut, loadUsersStub } = makeSut()
    jest.spyOn(loadUsersStub, 'loadAll').mockImplementationOnce(() => {
      return Promise.resolve([])
    })
    const result = await sut.handle({})
    expect(result).toEqual(notFound())
    expect(result.statusCode).toBe(404)
  })
  test('should return notFound if loadByName return undefined', async () => {
    const { sut, loadUsersStub } = makeSut()
    jest.spyOn(loadUsersStub, 'loadByName').mockImplementationOnce(() => {
      return Promise.resolve(undefined)
    })
    const result = await sut.handle({ name: 'someone' })
    expect(result).toEqual(notFound())
    expect(result.statusCode).toBe(404)
  })
  test('should return notFound if loadByAdmin return a empty list', async () => {
    const { sut, loadUsersStub } = makeSut()
    jest.spyOn(loadUsersStub, 'loadByAdmin').mockImplementationOnce(() => {
      return Promise.resolve([])
    })
    const firstResult = await sut.handle({ admin: 'true' })
    expect(firstResult).toEqual(notFound())
    expect(firstResult.statusCode).toBe(404)
    jest.spyOn(loadUsersStub, 'loadByAdmin').mockImplementationOnce(() => {
      return Promise.resolve([])
    })
    const secondResult = await sut.handle({ admin: 'false' })
    expect(secondResult).toEqual(notFound())
    expect(secondResult.statusCode).toBe(404)
  })
  test('should return ok on call loadAll correctly', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({})
    expect(result).toEqual(ok([ mockUserModelDto ]))
    expect(result.statusCode).toBe(200)
  })
  test('should return ok on call loadByName correctly', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({ name: 'someone' })
    expect(result).toEqual(ok(mockUserModelDto))
    expect(result.statusCode).toBe(200)
  })
  test('should return ok on call loadAll correctly', async () => {
    const { sut } = makeSut()
    const firstResult = await sut.handle({ admin: 'true' })
    expect(firstResult).toEqual(ok([ mockUserModelDto ]))
    expect(firstResult.statusCode).toBe(200)
    const secondResult = await sut.handle({ admin: 'false' })
    expect(secondResult).toEqual(ok([ mockUserModelDto ]))
    expect(secondResult.statusCode).toBe(200)
  })
})