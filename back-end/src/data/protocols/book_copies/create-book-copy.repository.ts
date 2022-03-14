import { BookCopyModel } from '../../../domain/models/book_copy'

export interface CreateBookCopyRepository {
  create: (data: CreateBookCopyRepository.Params) => Promise<BookCopyModel>
}

export namespace CreateBookCopyRepository {
  export type Params = {
    code: string
    isAvailable: boolean
    created_by: string
    book_id: string
  }
}
