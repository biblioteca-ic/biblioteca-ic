import { Controller } from "../../protocols/controller";
import { badRequest, noContent, ok, serverError } from "../../helpers/http-helper";
import { Validation } from "../../validation/protocols/validation";
import { RenewBookCopy } from "../../../domain/usecases/book_copies/renew-book-copy";
import { HttpResponse } from "../../protocols/http-response";

export type RenewBorrowedBookCopyRequest = {
    copyId: string
}

export class RenewBorrowedBookCopyController implements Controller {
    constructor (
        private readonly _validation: Validation,
        private readonly _renewCopy: RenewBookCopy
    ) { }

    async handle (request: RenewBorrowedBookCopyRequest): Promise<HttpResponse> {
        try {
            const error = this._validation.validate(request)
            if (error) return badRequest(error.message)
            const bookCopy = await this._renewCopy.execute(request.copyId)
            if (bookCopy instanceof Error) return badRequest(bookCopy.message)
            return noContent()
        } catch (error) {
            return serverError()
        }
    }
}