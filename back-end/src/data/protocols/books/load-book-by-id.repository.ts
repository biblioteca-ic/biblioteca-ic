import { BookModel } from '../../../domain/models/book'

export interface LoadBookByIdRepository {
  loadById: (id: string) => Promise<BookModel>
}
