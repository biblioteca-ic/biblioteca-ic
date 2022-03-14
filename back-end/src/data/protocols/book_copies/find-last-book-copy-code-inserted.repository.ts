export interface FindLastBookCopyCodeInsertedRepository {
  find: (prefix: string) => Promise<BookCopyCode[]>
}

export type BookCopyCode = {
  code: string
}
