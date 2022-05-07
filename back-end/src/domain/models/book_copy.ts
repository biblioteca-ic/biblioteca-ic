export enum BookCopyStatus {
  AVAILABLE,
  RENTED,
  MISPLACED,
  LATE
}

export type BookCopyModel = {
  id: string
  book_id: string
  code: string
  status: BookCopyStatus
  created_by: string
  located_by: string
  lease_date: Date
  devolution_date: Date
  createdAt: Date
}
