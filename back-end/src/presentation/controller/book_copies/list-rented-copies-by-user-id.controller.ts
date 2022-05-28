import { HttpResponse } from '../../../presentation/protocols/http-response'
import { Controller } from '../../../presentation/protocols/controller'
import { ListRentedCopiesByUserId } from '../../../domain/usecases/users/list-rented-copies-by-user-id'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Validation } from '../../../presentation/validation/protocols/validation'

export class ListRentedCopiesByUserIdController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _listRentedCopiesByUserId: ListRentedCopiesByUserId) { }
  async handle (request: ListRentedCopiesByUserIdControllerRequest): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) {
        return badRequest(error.message)
      }
      const rentedCopies = await this._listRentedCopiesByUserId.listByUserid(request.userId)
      return ok(rentedCopies)
    } catch (error) {
      return serverError()
    }
  }
}

type ListRentedCopiesByUserIdControllerRequest = {
  userId: string
}