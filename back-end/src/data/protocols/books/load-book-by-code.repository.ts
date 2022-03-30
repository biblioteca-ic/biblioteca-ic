import { BookModel } from '../../../domain/models/book'

export interface LoadBookByCodeRepository {
  loadByCode: (book_code: string) => Promise<BookModel>
}
