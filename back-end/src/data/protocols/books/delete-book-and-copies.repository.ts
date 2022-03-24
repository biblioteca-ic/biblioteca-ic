import { BookModelDto } from '../../../domain/models/book'

export interface DeleteBookAndCopiesRepository {
  delete: (bookId: string) => Promise<BookModelDto>
}
