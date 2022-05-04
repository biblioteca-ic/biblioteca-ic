import { BookCopyModel } from '../../../domain/models/book_copy'
import { BadRequestError } from '../../../presentation/errors/bad-request-error'

export class CheckUserPendencies {
  static check (copies: BookCopyModel[], bookId: string): Error|void {
    if (copies.length > 0) {
      try {
        if (copies.length > 2) throw new BadRequestError('You cannot borrow more than 3 books')

        copies.forEach(copy => {
          if (copy.devolution_date && (copy.devolution_date.getTime() <= Date.now())) {
            throw new BadRequestError(`You have overdue returns`)
          }
        })

        copies.forEach(copy => {
          if (copy.book_id === bookId) {
            throw new BadRequestError('You can only take one copy of each book')
          }
        })
      } catch (error) {
        return error as Error
      }
    }
  }
}