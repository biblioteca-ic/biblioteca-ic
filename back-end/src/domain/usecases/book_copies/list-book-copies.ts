import { BookCopyModel } from '../../models/book_copy'

export interface ListBookCopies {
  list: (book_code: string) => Promise<BookCopyModel[]>
}
