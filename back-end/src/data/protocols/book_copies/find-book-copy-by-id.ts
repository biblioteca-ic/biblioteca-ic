import { BookCopyModel } from "../../../domain/models/book_copy";

export interface FindBookCopyById {
  find: (id: string) => Promise<BookCopyModel|void>
}