import { ChangePassword } from '../../../domain/usecases/change-password'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'

export class ChangePasswordController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _changePassword: ChangePassword
  ) { }

  async handle (request: ChangePasswordController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error.message)
      }
      const changed = await this._changePassword.change(request)
      if (!changed) return badRequest('could not change password')
      return ok({ message: 'password has been changed successfully' })
    } catch (error) {
      return serverError()
    }
  }
}

export namespace ChangePasswordController {
  export type Request = {
    id: string
    oldPassword: string
    newPassword: string
    newPasswordConfirmation: string
  }
}
