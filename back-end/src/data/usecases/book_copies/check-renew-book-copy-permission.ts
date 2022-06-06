import { BookCopyModel } from "../../../domain/models/book_copy";
import { devolution_limit } from "../../../domain/contracts/borrowing"

export class CheckRenewBookCopyPermission {
  canRenew (bookCopy: BookCopyModel, compared_date: Date = new Date()): boolean {
    const devolution_limit_date = new Date(bookCopy.lease_date.getTime())
    devolution_limit_date.setDate(devolution_limit_date.getDate() + devolution_limit)
    return (compared_date >= devolution_limit_date)
  }
}