import { LoadUsers } from '../../../domain/usecases/users/load-users'
import { notFound, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http-response'

export class ListUsersController implements Controller {
  constructor (private readonly _listUsers: LoadUsers) { }

  async handle (request: ListUsersControllerRequest): Promise<HttpResponse> {
    try {
      const { name, admin } = request
      let users: any
      if (name) {
        users = await this._listUsers.loadByName(name)
      } else if (admin !== undefined) {
        users = await this._listUsers.loadByAdmin(JSON.parse(admin))
      } else {
        users = await this._listUsers.loadAll()
      }
      if (!users || users.length < 1) return notFound()
      return ok(users)
    } catch (error) {
      return serverError()
    }
  }
}

export type ListUsersControllerRequest = {
  name?: string
  admin?: string
}
