import { Authentication } from '../../../domain/usecases/authentication'
import { ok, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) { }

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
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
