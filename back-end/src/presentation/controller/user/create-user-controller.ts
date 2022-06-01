import { CreateUserData } from '../../../domain/usecases/create-user-data'
import { badRequest, created, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'

export class CreateUserController implements Controller {
  constructor (
    private readonly _createUserData: CreateUserData,
    private readonly _validation: Validation
  ) { }

  async handle (request: CreateUserController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error.message)
      }
      const user = await this._createUserData.create(Object.assign({}, request, { admin: false }))
      if (user instanceof Error) {
        return badRequest(user.message)
      }
      return created(user)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace CreateUserController {
  export type Request = {
    name: string
    email: string
    cpf: string
    registrationNumber: string
    password: string
    passwordConfirmation: string
  }
}
