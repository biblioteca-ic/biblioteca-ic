import { BookModelDto } from '../../../domain/models/book'

export interface UpdateBookRepository {
  update: (id: string, params: any) => Promise<BookModelDto>
}
