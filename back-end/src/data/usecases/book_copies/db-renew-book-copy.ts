import { LoadBookCopyByIdRepository } from '../../../data/protocols/book_copies/load-book-copy-by-id.repository';
import { BookCopyModel } from "../../../domain/models/book_copy";
import { RenewBookCopy } from "../../../domain/usecases/book_copies/renew-book-copy";
import { RenewCopyRepository } from "../../protocols/book_copies/renew-copy.repository";
import { RenewLateCopyError } from '../exceptions/renew-late-copy';
import { CheckRenewBookCopyPermission } from "./check-renew-book-copy-permission";
import { GenerateNewDevolutionDate } from "./generate-new-devolution-date";

export class DbRenewBookCopy implements RenewBookCopy {
  constructor (
    private readonly _loadBookCopyByIdRepository: LoadBookCopyByIdRepository,
    private readonly _renewCopyRepository: RenewCopyRepository
  ) { }

  async execute (book_copy_id: string): Promise<void | Error> {
    const bookCopy = await this._loadBookCopyByIdRepository.loadById(book_copy_id)
    if (!bookCopy) return new Error('BookCopy ' + book_copy_id + ' not found.')
    const hasPermissionToRenew = this.checkRenewBookCopyPermission(
      bookCopy
    )
    if (hasPermissionToRenew) {
      const new_devolution_date = this.generateNewDevolutionDate(
        new Date(),
        bookCopy.lease_date
      )
      await this._renewCopyRepository.renew(book_copy_id, { devolutionDate: new_devolution_date })
    }
    return new RenewLateCopyError('O empréstimo desta cópia não pode ser renovado pois está em atraso.')
  }

  checkRenewBookCopyPermission (bookCopy: BookCopyModel): boolean {
    const checker = new CheckRenewBookCopyPermission()
    return checker.canRenew(bookCopy)
  }

  generateNewDevolutionDate (current_date: Date, lease_date: Date): Date {
    const generator = new GenerateNewDevolutionDate()
    const result = generator.generate(current_date, lease_date)
    return result
  }
}
