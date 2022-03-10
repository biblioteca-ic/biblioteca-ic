import { Authentication } from '../../../domain/usecases/users/authentication'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) { }

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error.message)
      }
      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace LoginController {
  export type Request = {
    cpf: string
    password: string
  }
}
