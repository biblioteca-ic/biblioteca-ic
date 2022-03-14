import { BookCopyModel } from '../../models/book_copy'

export interface RegisterBookCopy {
  add: (params: RegisterBookCopy.Params) => Promise<BookCopyModel>
}

export namespace RegisterBookCopy {
  export type Params = {
    book_code: string
    created_by: string
  }
}
