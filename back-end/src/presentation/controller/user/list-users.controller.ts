import { ListUsers } from '../../../domain/usecases/users/list-users'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'

export class ListUsersController implements Controller {
  constructor (private readonly _listUsers: ListUsers) { }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const users = await this._listUsers.listAll()
      return ok(users)
    } catch (error) {
      return serverError()
    }
  }
}
