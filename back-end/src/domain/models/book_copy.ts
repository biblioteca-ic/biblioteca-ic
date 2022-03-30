enum BookStatus {
  AVAILABLE,
  RENTED,
  LOST
}

export type BookCopyModel = {
  id: string
  book_id: string
  code: string
  status: BookStatus
  created_by: string
  located_by: string
  lease_date: Date
  createdAt: Date
}
