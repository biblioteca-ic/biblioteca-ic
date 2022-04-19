import { BookCopyModel } from '../../../domain/models/book_copy'

export interface LoadCopiesByUserIdRepository {
  load: (id: string) => Promise<BookCopyModel[]>
}
