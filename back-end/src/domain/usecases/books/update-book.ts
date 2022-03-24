import { BookModelDto } from '../../models/book'

export interface UpdateBook {
  update: (params: UpdateBookParams) => Promise<BookModelDto>
}

export type UpdateBookParams = {
  id: string
  title?: string
  publishingHouse?: string
  authors?: string[]
  categories?: string[]
  publishedIn?: Date
}
