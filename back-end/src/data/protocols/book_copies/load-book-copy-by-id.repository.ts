import { BookCopyModel } from '../../../domain/models/book_copy'

export interface LoadBookCopyByIdRepository {
  loadById: (id: string) => Promise<BookCopyModel>
}
