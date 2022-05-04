import { BookCopyModel } from "../../../domain/models/book_copy";
import { devolution_limit } from "../../../domain/contracts/borrowing"

export class CheckRenewBookCopyPermission {
  async check(bookCopy: BookCopyModel, compared_date: Date = new Date()): Promise<Error|void> {
    const devolution_limit_date = new Date(bookCopy.lease_date.getTime())
    devolution_limit_date.setDate(devolution_limit_date.getDate() + devolution_limit)
    if ( compared_date > devolution_limit_date ) return Error('Compared date is greather than devolution limit.')
  }
}