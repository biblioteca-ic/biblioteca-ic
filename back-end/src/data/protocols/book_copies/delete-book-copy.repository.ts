export interface DeleteBookCopyRepository {
  delete: (id: string) => Promise<void>
}
