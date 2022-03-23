export type BookModel = {
  id: string
  title: string
  publishingHouse: string
  authors: string[]
  categories: string[]
  createdBy: string
  code: string
  publishedIn: Date
  createdAt: Date
}

export type BookModelDto = {
  id: string
  title: string
  publishingHouse: string
  authors: string[]
  categories: string[]
  createdBy: string
  code: string
  publishedIn: Date
  createdAt: Date
  copies: Number
  borrowed_copies: Number
  lost_copies: Number
  available_copies: Number
}
