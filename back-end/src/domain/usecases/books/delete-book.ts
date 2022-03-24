import { BookModelDto } from '../../models/book'

export interface DeleteBook {
  delete: (id: string) => Promise<BookModelDto>
}
