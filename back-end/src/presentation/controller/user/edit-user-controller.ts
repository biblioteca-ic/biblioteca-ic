import { EditUserData } from '../../../domain/usecases/edit-user-data'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'
import { Validation } from '../../validation/protocols/validation'

export class EditUserController implements Controller {
  constructor (
    private readonly _editUserData: EditUserData,
    private readonly _validation: Validation
  ) { }

  async handle (request: EditUserController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error.message)
      }
      const user = await this._editUserData.edit(request)
      return ok(user)
    } catch (error) {
      return serverError()
    }
  }
}

export namespace EditUserController {
  export type Request = {
    id: string
    name?: string
    email?: string
    registrationNumber?: string
  }
}
