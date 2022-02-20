import { CreateUserData } from '../../../domain/usecases/create-user-data'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
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

      const user = await this._createUserData.create(request)

      if(!user) {
        return badRequest("Usuário já existe.")
      }
      
      return ok(user)
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
    password_confirmation: string
  }
}
