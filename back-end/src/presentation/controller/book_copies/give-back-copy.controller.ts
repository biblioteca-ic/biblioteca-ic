import { GiveBackCopy } from '../../../domain/usecases/book_copies/give-back-copy';
import { badRequest, noContent, serverError } from '../../../presentation/helpers/http-helper';
import { Controller } from '../../../presentation/protocols/controller'
import { HttpResponse } from '../../../presentation/protocols/http-response';
import { Validation } from '../../../presentation/validation/protocols/validation';

export class GiveBackBookCopyController implements Controller {
  constructor (
    private readonly _validation: Validation,
    private readonly _giveBackCopy: GiveBackCopy
  ) { }
  async handle (params: any): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(params)
      if (error) return badRequest(error.message)

      await this._giveBackCopy.giveBack(params)
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
