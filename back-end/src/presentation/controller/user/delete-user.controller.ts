import { DeleteUser } from '../../../domain/usecases/users/delete-user'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'

export class DeleteUserController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _deleteUser: DeleteUser
  ) { }

  async handle (request: DeleteUserControllerRequest): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) return badRequest(error.message)
      const { id } = request
      const deactivatedUser = await this._deleteUser.deactivate(id)
      if (!deactivatedUser) return serverError()
      return ok(deactivatedUser)
    } catch (error) {
      serverError()
    }
    return Promise.resolve(null)
  }
}

export type DeleteUserControllerRequest = {
  id: string
}
