export interface FindLastBookCodeInsertedRepository {
  find: () => Promise<BookCode[]>
}

export type BookCode = {
  code: string
}
