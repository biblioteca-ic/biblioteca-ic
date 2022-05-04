import { ListCopiesLoanedToUser } from "../../../domain/usecases/book_copies/list-copies-loaned-to-user";
import { notFound, ok, serverError, badRequest } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/http-response";
import { Validation } from "../../validation/protocols/validation"

export type ListCopiesLoanedToUserRequest = {
  user_id?: string
}

export class ListCopiesLoanedToUserController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _listCopiesLoanedToUser: ListCopiesLoanedToUser
  ) {} 

  async handle(request: ListCopiesLoanedToUserRequest): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request)
      if (error) return badRequest(error.message)
      const bookCopies = await this._listCopiesLoanedToUser.list(request.user_id)
      if (!bookCopies || bookCopies.length === 0) return notFound()
      return ok(bookCopies)
    } catch (error) {
      return serverError()
    }
  }
}
