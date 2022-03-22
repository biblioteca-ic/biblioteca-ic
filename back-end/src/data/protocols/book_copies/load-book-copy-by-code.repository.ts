import { BookCopyModel } from '../../../domain/models/book_copy'

export interface LoadBookCopyByCodeRepository {
  loadByCode: (code: string) => Promise<BookCopyModel>
}
