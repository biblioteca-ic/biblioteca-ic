import { BookCopyModel } from '../../models/book_copy'

export interface ListCopiesLoanedToUser {
  list: (user_id: string) => Promise<BookCopyModel[]>
}
