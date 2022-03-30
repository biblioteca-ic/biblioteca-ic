export interface DeleteBookCopy {
  delete: (params: DeleteBookCopy.Params) => Promise<Boolean>
}

export namespace DeleteBookCopy {
  export type Params = {
    book_id: string
  }
}
