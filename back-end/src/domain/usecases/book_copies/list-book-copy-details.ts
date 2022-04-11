import { BookCopyModel } from '../../models/book_copy'

export interface ListBookCopyDetails {
  list: (book_copy_id: string) => Promise<BookCopyModel>
}
