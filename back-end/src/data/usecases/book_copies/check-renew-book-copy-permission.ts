import { BookCopyModel } from "../../../domain/models/book_copy";

export class CheckRenewBookCopyPermission {
  async check(bookCopy: BookCopyModel): Promise<Error|void> {
    // TODO: return error if devolution date of book copy is more than devolution_limit const
  }
}