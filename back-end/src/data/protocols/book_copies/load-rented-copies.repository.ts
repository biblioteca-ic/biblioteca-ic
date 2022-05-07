import { BookCopyModel } from '../../../domain/models/book_copy'

export interface LoadRentedCopiesRepository {
  loadAll: () => Promise<BookCopyModel[]>
}
