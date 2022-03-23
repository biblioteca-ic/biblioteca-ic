import { BookModelDto } from '../../../domain/models/book'

export interface ListBooksRepository {
  listAll: (params: any) => Promise<BookModelDto[]>
}
