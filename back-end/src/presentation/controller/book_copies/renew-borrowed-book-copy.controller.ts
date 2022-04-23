import {Controller} from "../../protocols/controller";
import {badRequest, ok, serverError} from "../../helpers/http-helper";
import {Validation} from "../../validation/protocols/validation";
import {RenewBookCopy} from "../../../domain/usecases/book_copies/renew-book-copy";
import {HttpResponse} from "../../protocols/http-response";

export type RenewBorrowedBookCopyRequest = {
    book_copy_id?: string
}

export class RenewBorrowedBookCopyController implements Controller {
    constructor(
       private readonly _validation: Validation,
       private readonly _renewCopy: RenewBookCopy
    ) {}

    async handle(request: RenewBorrowedBookCopyRequest): Promise<HttpResponse> {
        try {
            const error = this._validation.validate(request)
            if (error) return badRequest(error.message)
            const bookCopy = await this._renewCopy.execute(request.book_copy_id)
            if (bookCopy instanceof Error) return badRequest(bookCopy.message)
            return ok(bookCopy)
        } catch (error) {
            return serverError()
        }
    }
}