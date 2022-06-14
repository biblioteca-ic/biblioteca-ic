import { BookCopyModel } from '../../../domain/models/book_copy'

export interface LoadDelayedAndMisplacedCopiesRepository {
  loadDelayedAndMisplaced: () => Promise<BookCopyModel[]>
}
