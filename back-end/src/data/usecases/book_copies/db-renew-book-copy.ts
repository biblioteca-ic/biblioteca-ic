import { FindBookCopyById } from "../../protocols/book_copies/find-book-copy-by-id";
import { RenewCopyRepository } from "../../protocols/book_copies/renew-copy.repository";
import { BookCopyModel } from "../../../domain/models/book_copy";
import { RenewBookCopy } from "../../../domain/usecases/book_copies/renew-book-copy";
import { CheckRenewBookCopyPermission } from "./check-renew-book-copy-permission";
import { GenerateNewDevolutionDate } from "./generate-new-devolution-date";

export class DbRenewBookCopy implements RenewBookCopy {
  public readonly return_period = 21

  constructor (
    private readonly _findBookCopyById: FindBookCopyById,
    private readonly _renewCopyRepository: RenewCopyRepository
  ) {}

  async execute(book_copy_id: string): Promise<BookCopyModel | Error> {
    const bookCopy = await this._findBookCopyById.find(book_copy_id)
    if ( ! bookCopy ) return new Error('BookCopy ' + book_copy_id + ' not found.')
    const hasPermissionToRenew = await this._checkRenewBookCopyPermission(
      bookCopy as unknown as BookCopyModel
    )
    if (hasPermissionToRenew instanceof Error) return hasPermissionToRenew
    const new_devolution_date = await this._generateNewDevolutionDate(
      new Date(),
      bookCopy.lease_date
    )
    const bookCopyModel = await this._renewCopyRepository.renew(book_copy_id, { devolutionDate: new_devolution_date })
    if ( ! bookCopyModel ) return new Error('Copy renewal fail because RenewCopyRepository return undefined')
    return bookCopyModel
  }

  async _checkRenewBookCopyPermission(bookCopy: BookCopyModel): Promise<Error|void> {
    const checker = new CheckRenewBookCopyPermission
    const result = await checker.check(bookCopy)
    return result
  }

  async _generateNewDevolutionDate(current_date: Date, lease_date: Date): Promise<Date> {
    const generator = new GenerateNewDevolutionDate
    const result = await generator.generate(current_date, lease_date)
    return result
  }
}
