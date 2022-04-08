import { BookCopyModel } from '../../../domain/models/book_copy'

export interface ListBookCopiesRepository {
  listAllByBookCode: (book_code_prefix: any) => Promise<BookCopyModel[]>
}
