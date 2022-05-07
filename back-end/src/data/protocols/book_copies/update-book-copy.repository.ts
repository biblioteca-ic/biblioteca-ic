
export interface UpdateBookCopyStatusRepository {
  updateToMisplaced: (copyId: string) => Promise<void>
  updateToLate: (copyId: string) => Promise<void>
}