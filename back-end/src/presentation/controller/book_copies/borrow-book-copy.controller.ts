import { BorrowCopy } from '../../../domain/usecases/book_copies/borrow-copy';
import { badRequest, noContent, serverError } from '../../../presentation/helpers/http-helper';
import { Controller } from '../../../presentation/protocols/controller';
import { HttpResponse } from '../../../presentation/protocols/http-response';
import { Validation } from '../../../presentation/validation/protocols/validation';

export class BorrowBookCopyController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _borrowCopy: BorrowCopy,
  ) { }

  async handle (params: BorrowBookCopyControllerType): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(params)
      if (error) {
        return badRequest(error.message)
      }

      const dependencyError = await this._borrowCopy.execute(params)
      if (dependencyError) {
        return badRequest(dependencyError.message)
      }
      return noContent()
    } catch (error) {
      console.error(error);

      return serverError()
    }

  }
}

export type BorrowBookCopyControllerType = {
  copyId: string
  bookId: string
  userId: string
}
