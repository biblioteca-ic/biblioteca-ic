export type BookCopyModel = {
  id: string
  book_id: string
  code: string
  isAvailable: boolean
  created_by: string
  located_by: string
  lease_date: Date
  createdAt: Date
}
