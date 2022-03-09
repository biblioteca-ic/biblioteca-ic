import { ChangeAdmin } from '../../../domain/usecases/make-admin'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'

export class ChangeAdminController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _changeAdmin: ChangeAdmin
  ) { }

  async handle (request: ChangeAdminController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error.message)
      }
      const user = await this._changeAdmin.change(request)
      return ok(user)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace ChangeAdminController {
  export type Request = {
    id: string
    admin: boolean
  }
}
